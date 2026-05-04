```javascript
const readline = require('readline');

// Clase para visualizar la búsqueda binaria
class BinarySearchVisualizer {
  constructor() {
    this.array = [];
    this.steps = [];
    this.targetFound = false;
    this.targetValue = null;
    this.targetIndex = -1;
  }

  // Generar array ordenado para búsqueda binaria
  generateSortedArray(size = 20, maxValue = 100) {
    this.array = Array.from({ length: size }, (_, i) => 
      Math.floor(Math.random() * maxValue) + 1
    ).sort((a, b) => a - b);
    this.steps = [];
    this.targetFound = false;
    this.targetIndex = -1;
    return this.array;
  }

  // Algoritmo de búsqueda binaria con registro de pasos
  binarySearch(target) {
    this.steps = [];
    this.targetValue = target;
    
    let left = 0;
    let right = this.array.length - 1;
    let step = 0;

    while (left <= right) {
      step++;
      const mid = Math.floor((left + right) / 2);
      const midValue = this.array[mid];

      this.steps.push({
        step,
        left,
        right,
        mid,
        midValue,
        target,
        status: midValue === target ? 'ENCONTRADO' : 
                midValue < target ? 'BUSCAR DERECHA' : 'BUSCAR IZQUIERDA'
      });

      if (midValue === target) {
        this.targetFound = true;
        this.targetIndex = mid;
        return { found: true, index: mid, steps: step };
      } else if (midValue < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    this.targetFound = false;
    this.targetIndex = -1;
    return { found: false, index: -1, steps: step };
  }

  // Visualizar el array con marcadores
  visualizeArray(highlightIndices = []) {
    let visualization = '┌';
    for (let i = 0; i < this.array.length; i++) {
      visualization += '────┬';
    }
    visualization += '──┐\n│ ';

    for (let i = 0; i < this.array.length; i++) {
      const value = this.array[i].toString().padStart(2, ' ');
      visualization += value + ' │ ';
    }
    visualization += '\n├';

    for (let i = 0; i < this.array.length; i++) {
      visualization += '────┼';
    }
    visualization += '──┤\n│ ';

    for (let i = 0; i < this.array.length; i++) {
      let marker = ' ';
      if (highlightIndices.includes(i)) {
        marker = '↑';
      }
      visualization += marker.padStart(2, ' ') + ' │ ';
    }
    visualization += '\n└';

    for (let i = 0; i < this.array.length; i++) {
      visualization += '────┴';
    }
    visualization += '──┘';

    return visualization;
  }

  // Mostrar tabla de pasos
  displayStepsTable() {
    if (this.steps.length === 0) return '';

    let table = '\n╔═══╦═════╦═════╦═════╦═════╦══════════════════╗\n';
    table += '║Paso║Izq ║Der ║Mid ║Val ║Status            ║\n';
    table += '╠═══╬═════╬═════╬═════╬═════╬══════════════════╣\n';

    for (const step of this.steps) {
      const paso = step.step.toString().padEnd(3);
      const izq = step.left.toString().padEnd(3);
      const der = step.right.toString().padEnd(3);
      const mid = step.mid.toString().padEnd(3);
      const val = step.midValue.toString().padEnd(3);
      const status = step.status.padEnd(16);
      
      table += `║${paso}║${izq} ║${der} ║${mid} ║${val} ║${status}║\n`;
    }

    table += '╚═══╩═════╩═════╩═════╩═════╩══════════════════╝';
    return table;
  }

  // Mostrar resultado final
  displayResult() {
    let result = '\n╔════════════════════════════════════════════════════╗\n';
    
    if (this.targetFound) {
      result += `║ ✓ VALOR ENCONTRADO: ${this.targetValue} en índice ${this.targetIndex}\n`;
    } else {
      result += `║ ✗ VALOR NO ENCONTRADO: ${this.targetValue}\n`;
    }
    
    result += `║ Total de pasos: ${this.steps.length}\n`;
    result += `║ Complejidad teórica: O(log n) = O(log ${this.array.length})\n`;
    result += '╚════════════════════════════════════════════════════╝';
    
    return result;
  }

  // Demostración automática
  runDemo() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║   ALGORITMO DE BÚSQUEDA BINARIA CON VISUALIZACIÓN   ║');
    console.log('╚════════════════════════════════════════════════════╝\n');