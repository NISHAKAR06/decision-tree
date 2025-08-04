from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app) # Allow cross-origin requests

# --- ID3 and CART Logic (consolidated from user's scripts) ---

def entropy(y):
    classes, counts = np.unique(y, return_counts=True)
    prob = counts / counts.sum()
    return -np.sum(prob * np.log2(prob))

def info_gain(X_col, y):
    values, counts = np.unique(X_col, return_counts=True)
    weighted_entropy = 0
    for v, c in zip(values, counts):
        weighted_entropy += (c / len(y)) * entropy(y[X_col == v])
    return entropy(y) - weighted_entropy

def id3(X, y, features):
    if len(np.unique(y)) == 1:
        return {'type': 'leaf', 'prediction': np.unique(y)[0], 'count': len(y), 'total': len(y)}
    if len(features) == 0:
        majority = y.value_counts().idxmax()
        return {'type': 'leaf', 'prediction': majority, 'count': y.value_counts().max(), 'total': len(y)}

    gains = [info_gain(X[f], y) for f in features]
    best_feat = features[np.argmax(gains)]
    
    node = {'type': 'decision', 'attribute': best_feat, 'subtrees': {}, 'dataCount': len(y)}
    
    for val in np.unique(X[best_feat]):
        subset_X = X[X[best_feat] == val].drop(columns=[best_feat])
        subset_y = y[X[best_feat] == val]
        remaining_features = subset_X.columns.tolist()
        node['subtrees'][str(val)] = id3(subset_X, subset_y, remaining_features)
        
    return node

def gini(y):
    classes, counts = np.unique(y, return_counts=True)
    prob = counts / counts.sum()
    return 1 - np.sum(prob**2)

def gini_gain(X_col, y):
    values, counts = np.unique(X_col, return_counts=True)
    weighted_gini = 0
    for v, c in zip(values, counts):
        weighted_gini += (c / len(y)) * gini(y[X_col == v])
    return gini(y) - weighted_gini

def cart_classification(X, y, features):
    if len(np.unique(y)) == 1:
        return {'type': 'leaf', 'prediction': np.unique(y)[0], 'count': len(y), 'total': len(y)}
    if len(features) == 0:
        majority = y.value_counts().idxmax()
        return {'type': 'leaf', 'prediction': majority, 'count': y.value_counts().max(), 'total': len(y)}

    gains = [gini_gain(X[f], y) for f in features]
    best_feat = features[np.argmax(gains)]
    
    node = {'type': 'decision', 'attribute': best_feat, 'subtrees': {}, 'dataCount': len(y)}

    for val in np.unique(X[best_feat]):
        subset_X = X[X[best_feat] == val].drop(columns=[best_feat])
        subset_y = y[X[best_feat] == val]
        remaining_features = subset_X.columns.tolist()
        node['subtrees'][str(val)] = cart_classification(subset_X, subset_y, remaining_features)
        
    return node

def mse(y):
    return np.var(y) * len(y)

def best_split_regression(X, y, features):
    best_feature, best_value, best_score = None, None, float('inf')
    for feature in features:
        for val in np.unique(X[feature]):
            left_y = y[X[feature] == val]
            right_y = y[X[feature] != val]
            if len(left_y) == 0 or len(right_y) == 0:
                continue
            score = mse(left_y) + mse(right_y)
            if score < best_score:
                best_feature, best_value, best_score = feature, val, score
    return best_feature, best_value

def cart_regression(X, y, features, depth=0, max_depth=3):
    if depth == max_depth or len(np.unique(y)) <= 1 or len(features) == 0:
        return {'type': 'leaf', 'prediction': round(np.mean(y), 2), 'count': len(y), 'total': len(y)}

    feat, val = best_split_regression(X, y, features)
    if feat is None:
        return {'type': 'leaf', 'prediction': round(np.mean(y), 2), 'count': len(y), 'total': len(y)}

    node = {'type': 'decision', 'attribute': f"{feat} = {val}", 'subtrees': {}, 'dataCount': len(y)}
    
    left_idx = (X[feat] == val)
    right_idx = (X[feat] != val)
    
    node['subtrees']['yes'] = cart_regression(X[left_idx], y[left_idx], features, depth+1, max_depth)
    node['subtrees']['no']  = cart_regression(X[right_idx], y[right_idx], features, depth+1, max_depth)

    return node


@app.route('/build_tree', methods=['POST'])
def build_tree_endpoint():
    data = request.json
    df = pd.DataFrame(data['dataset'])
    target_attribute = data['targetAttribute']
    attributes = data['attributes']

    X = df[attributes]
    y = df[target_attribute]

    # Only use ID3
    tree = id3(X, y, attributes)

    return jsonify(tree)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
