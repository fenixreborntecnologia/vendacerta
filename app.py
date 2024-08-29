from flask import Flask, render_template, request, url_for, flash, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/area-logada')
def area_logada():
    return render_template('area-logada.html')

@app.route('/cadastrar')
def cadastrar():
    return render_template('cadastrar.html')

if __name__ == '__main__':
    app.run(debug=True)