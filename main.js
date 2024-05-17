function generateArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

function renderBars(array) {
    const barsContainer = document.querySelector('.bars-container');
    barsContainer.innerHTML = '';
    array.forEach(num => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${num * 3}px`;
        barsContainer.appendChild(bar);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderBars(array);
                await delay(100 - document.getElementById('speed-slider').value);
            }
        }
    }
}

async function selectionSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        renderBars(array);
        await delay(100 - document.getElementById('speed-slider').value);
    }
}

async function insertionSort(array) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
        renderBars(array);
        await delay(100 - document.getElementById('speed-slider').value);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sizeSlider = document.getElementById('size-slider');
    const sortBtn = document.getElementById('sort-btn');
    const resetBtn = document.getElementById('reset-btn');

    let arraySize = sizeSlider.value;
    let array = generateArray(arraySize);
    renderBars(array);

    sizeSlider.addEventListener('input', () => {
        arraySize = sizeSlider.value;
        array = generateArray(arraySize);
        renderBars(array);
    });

    sortBtn.addEventListener('click', async () => {
        const algorithm = document.getElementById('algorithm-select').value;
        sortBtn.disabled = true;
        resetBtn.disabled = true;
        switch (algorithm) {
            case 'bubble':
                await bubbleSort(array);
                break;
            case 'selection':
                await selectionSort(array);
                break;
            case 'insertion':
                await insertionSort(array);
                break;
        }
        sortBtn.disabled = false;
        resetBtn.disabled = false;
    });

    resetBtn.addEventListener('click', () => {
        array = generateArray(arraySize);
        renderBars(array);
    });
});