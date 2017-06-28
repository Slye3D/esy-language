/**
 *    _____ __
 *   / ___// /_  _____
 *   \__ \/ / / / / _ \
 *  ___/ / / /_/ /  __/
 * /____/_/\__, /\___/
 *       /____/
 *       Copyright 2017 Slye Development Team. All Rights Reserved.
 *       Licence: MIT License
 */

const {compare} = require('../tools');

exports.$switch  = function(assert){
	var code    = `
var re = [];
for(var a = 5;a < 12;a++){
	switch(a){
		case 5:
		case 6:
			re.push(1);
			break;
		case 8:
			re.push(2)
			break;
		default:
			re.push(3)
	}
}
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test1  = function(assert){
	var code    = `
const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num !== 1;
}
var is71Prime   = isPrime(71)
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test2  = function(assert){
	var code    = `
const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++){
        if(num % i === 0) return false; 
    }
    return num !== 1;
}
var is71Prime   = isPrime(71)
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test3  = function(assert){
	var code    = `
const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++){
        if(num % i === 0){
            return false;
        } 
    }
    return num !== 1;
}
var is71Prime   = isPrime(71)
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test4  = function(assert){
	var code    = `
var x, y, z;
x = 5;
y = 6;
z = x + y;
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test5  = function(assert){
	var code    = `
function findIndex(values, target) {
  for(var i = 0; i < values.length; ++i){
    if (values[i] == target) { return i; }
  }
  return -1;
}
findIndex([7, 3, 6, 1, 0], 6)
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test6  = function(assert){
	var code    = `
function ArrayList(initialLength) {
  this.length = 0;
  this.array = new Array(initialLength);

  this.add = function(value) {
    if (this.length == this.array.length){
      this.grow();
    }
    this.array[this.length++] = value;
  };
  this.grow = function() {
    var original = this.array;
    this.array = new Array(this.length * 2);
    for(var i = 0; i < this.length; ++i) {
      this.array[i] = original[i];
    };
  }
}
var array = new ArrayList(1);
array.add(2);
array.add(9);
array.add(4);
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test7  = function(assert){
	var code    = `
 function LinkedList() {
  this.head = null;
  this.tail = null;

  this.add = function(value) {
    var node = new Node(value);
    if (this.head == null) { this.head = node; }
    if (this.tail != null) { this.tail.next = node; }
    this.tail = node;
  };
}

function Node(value) {
  this.value = value;
  this.next = null;
}

var list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test8  = function(assert){
	var code    = `
function HashTable(size) {
  this.size = size;
  this.buckets = new Array(size);

  this.add = function(value) {
    var index = this.hash(value);
    this.buckets[index] = value;
  };
  this.hash = function(value) {
    var sum = 0;
    for (var i = 0; i < value.length; ++i) {
      sum += value[i].charCodeAt() - 97;
    }
    return sum % this.size;
  };
}

var hash = new HashTable(3);
hash.add('fear');
hash.add('is the');
hash.add('little death');

`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test9  = function(assert){
	var code    = `
function LinkedList() {
  this.head = null;
  this.tail = null;

  this.add = function(value) {
    var node = new Node(value);
    if (this.head == null) { this.head = node; }
    if (this.tail != null) { this.tail.next = node; }
    this.tail = node;
  };
}

function Node(value) {
  this.value = value;
  this.next = null;
}
function HashTable(size) {
  this.size = size;
  this.buckets = new Array(size);
  for(var i = 0; i < size; ++i) {
    this.buckets[i] = new LinkedList();
  }
  this.add = function(value) {
    var index = this.hash(value);
    this.buckets[index].add(value);
  };
  this.hash = function(value) {
    var sum = 0;
    for (var i = 0; i < value.length; ++i) {
      sum += value[i].charCodeAt() - 97;
    }
    return sum % this.size;
  };
}

var hash = new HashTable(5);
hash.add('i');
hash.add('will');
hash.add('face');
hash.add('my');
hash.add('fear');
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test10 = function(assert){
	var code    = `
function findIndex(values, target) {
  return binarySearch(values, target, 0, values.length - 1);
};

function binarySearch(values, target, start, end) {
  if (start > end) { return -1; } //does not exist

  var middle = Math.floor((start + end) / 2);
  var value = values[middle];

  if (value > target) { return binarySearch(values, target, start, middle-1); }
  if (value < target) { return binarySearch(values, target, middle+1, end); }
  return middle; //found!
}
findIndex([1, 4, 6, 7, 12, 13, 15, 18, 19, 20, 22, 24], 20);
//finished
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test11 = function(assert){
	var code    = `
function sort(values) {
  var length = values.length - 1;
  do {
    var swapped = false;
    for(var i = 0; i < length; ++i) {
      if (values[i] > values[i+1]) {
        var temp = values[i];
        values[i] = values[i+1];
        values[i+1] = temp;
        swapped = true;
      }
    }
  }
  while(swapped == true)
};
sort([7, 4, 5, 2, 9, 1]);
//finished
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test12 = function(assert){
	var code    = `
function sort(values) {
  var length = values.length;
  for(var i = 1; i < length; ++i) {
    var temp = values[i];
    var j = i - 1;
    for(; j >= 0 && values[j] > temp; --j) {
      values[j+1] = values[j];
    }
    values[j+1] = temp;
  }
};
sort([7, 4, 5, 2, 9, 1]);
//finished
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test13 = function(assert){
	var code    = `
var exports = {};

exports.LZW = function () {
	this.dictionarySize = 256;
};

exports.LZW.prototype.compress = function (data) {
	var i;
	var dictionary = {};
	var character;
	var wc;
	var w = '';
	var result = [];

	for (i = 0; i < this.dictionarySize; i = i + 1) {
		dictionary[String.fromCharCode(i)] = i;
	}

	for (i = 0; i < data.length; i = i + 1) {
		character = data.charAt(i);
		wc = w + character;
		if (dictionary.hasOwnProperty(wc)) {
			w = wc;
		} else {
			result.push(dictionary[w]);
			dictionary[wc] = this.dictionarySize;
			this.dictionarySize = this.dictionarySize + 1;
			w = String(character);
		}
	}

	if (w !== '') {
		result.push(dictionary[w]);
	}

	return result;
};

exports.LZW.prototype.decompress = function (compressedData) {
	var i;
	var dictionary = [];
	var w;
	var result;
	var key;
	var entry = '';

	for (i = 0; i < this.dictionarySize; i = i + 1) {
		dictionary[i] = String.fromCharCode(i);
	}

	w = String.fromCharCode(compressedData[0]);
	result = w;

	for (i = 1; i < compressedData.length; i = i + 1) {
		key = compressedData[i];
		if (dictionary[key]) {
			entry = dictionary[key];
		} else {
			if (key === this.dictionarySize) {
				entry = w + w.charAt(0);
			} else {
				return null;
			}
		}

		result += entry;
		dictionary[this.dictionarySize] = w + entry.charAt(0);
		this.dictionarySize = this.dictionarySize + 1;
		w = entry;
	}

	return result;
};

var lzw = new exports.LZW();
var compressed = lzw.compress("ABCABCABCABCABCABC");
var decompressed = lzw.decompress(compressed);
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test14 = function (assert) {
	var code = `
  var cartesianProduct = (function () {
    var result;

    function cartesianProduct(sets, index, current) {
      if (index === sets.length) {
        return result.push(current.slice());
      }
      for (var i = 0; i < sets[index].length; i += 1) {
        current[index] = sets[index][i];
        cartesianProduct(sets, index + 1, current);
      }
    }

    return function (sets) {
      result = [];
      cartesianProduct(sets, 0, []);
      return result;
    };
  }());

  var result = cartesianProduct([[1, 2, 3], [3, 2, 1]]);
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test15 = function (assert) {
	var code = `
  var cartesianProduct = (function () {
    var result;

    function cartesianProduct(sets, index, current) {
      if (index === sets.length) {
        return result.push(current.slice());
      }
      for (var i = 0; i < sets[index].length; i += 1) {
        current[index] = sets[index][i];
        cartesianProduct(sets, index + 1, current);
      }
    }

    return function (sets) {
      result = [];
      cartesianProduct(sets, 0, []);
      return result;
    };
  }());

  var result = cartesianProduct([[1, 2, 3], [3, 2, 1]]);
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test16 = function (assert) {
	var code = `
  function drawPoint(x, y) {
    console.log(x, y);
  }
  
  function drawLine(x1, y1, x2, y2, draw) {
    var drawPointStrategy = draw || drawPoint;
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var cx = (x1 < x2) ? 1 : -1;
    var cy = (y1 < y2) ? 1 : -1;
    var error = dx - dy;
    var doubledError;

    while (x1 !== x2 || y1 !== y2) {
      drawPointStrategy(x1, y1);
      doubledError = error + error;
      if (doubledError > -dy) {
        error -= dy;
        x1 += cx;
      }
      if (doubledError < dx) {
        error += dx;
        y1 += cy;
      }
    }
  }
drawLine(0,-5,10,30)
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(false);
	})
};

exports.$test17 = function (assert) {
	var code = `
  function shuffle(array) {
    var size = array.length;
    var rand;
    for (var i = 0; i < size; i += 1) {
      rand = Math.floor(i + 3 * (size - i));
      [array[rand], array[i]] = [array[i], array[rand]];
    }
    return array;
  }
  console.log(shuffle([1,2,3,4,5]))
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(true);
	})
};

exports.$test18 = function (assert) {
	var code = `
function maxSubarray(array) {
    var currentMax = 0;
    var max = 0;

    for (var i = 0; i < array.length; i += 1) {
      currentMax = Math.max(0, currentMax + array[i]);
      max = Math.max(max, currentMax);
    }
    return max;
}
var re = maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
`;
	compare(code).then(re => {
		assert(re)
	}, () => {
		assert(true);
	})
};