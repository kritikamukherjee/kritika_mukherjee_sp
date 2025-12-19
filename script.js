let isAutoMode = false;
let currentTimeout = null;

function clearLights() {
    document.getElementById('redLight').classList.remove('active');
    document.getElementById('yellowLight').classList.remove('active');
    document.getElementById('greenLight').classList.remove('active');
}

function activateLight(color) {
    clearLights();
    document.getElementById(color + 'Light').classList.add('active');
    document.getElementById('currentLight').textContent = color.charAt(0).toUpperCase() + color.slice(1);
}

function cycleLight(color) {
    if (!isAutoMode) return;
    
    activateLight(color);
    
    let nextColor, timing;
    if (color === 'red') {
        nextColor = 'green';
        timing = 5000;
    } else if (color === 'green') {
        nextColor = 'yellow';
        timing = 5000;
    } else {
        nextColor = 'red';
        timing = 2000;
    }
    
    currentTimeout = setTimeout(() => cycleLight(nextColor), timing);
}

document.getElementById('startBtn').onclick = function() {
    if (isAutoMode) return;
    isAutoMode = true;
    document.getElementById('statusText').textContent = 'Running (Auto)';
    document.getElementById('redBtn').disabled = true;
    document.getElementById('yellowBtn').disabled = true;
    document.getElementById('greenBtn').disabled = true;
    cycleLight('red');
};

document.getElementById('stopBtn').onclick = function() {
    isAutoMode = false;
    if (currentTimeout) clearTimeout(currentTimeout);
    document.getElementById('statusText').textContent = 'Stopped';
    document.getElementById('redBtn').disabled = false;
    document.getElementById('yellowBtn').disabled = false;
    document.getElementById('greenBtn').disabled = false;
};

document.getElementById('resetBtn').onclick = function() {
    isAutoMode = false;
    if (currentTimeout) clearTimeout(currentTimeout);
    clearLights();
    document.getElementById('statusText').textContent = 'Reset';
    document.getElementById('currentLight').textContent = 'None';
    document.getElementById('redBtn').disabled = false;
    document.getElementById('yellowBtn').disabled = false;
    document.getElementById('greenBtn').disabled = false;
};

document.getElementById('redBtn').onclick = function() {
    if (!isAutoMode) {
        activateLight('red');
        document.getElementById('statusText').textContent = 'Manual Control';
    }
};

document.getElementById('yellowBtn').onclick = function() {
    if (!isAutoMode) {
        activateLight('yellow');
        document.getElementById('statusText').textContent = 'Manual Control';
    }
};

document.getElementById('greenBtn').onclick = function() {
    if (!isAutoMode) {
        activateLight('green');
        document.getElementById('statusText').textContent = 'Manual Control';
    }
};