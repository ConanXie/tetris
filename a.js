var Tetris = function (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.matrix = [];
    this.size = 25;
    this.axle = [10, -2];
    this.nowShape = null;
    this.score = 0;
    this.highestScore = 10000;
    var that = this;
    function move(x, y) {
        if (x == -1 && y == 0) {
            if (!that.checkLeft(this)) {
                return;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            this.first[0]--;
            this.second[0]--;
            this.third[0]--;
            this.fourth[0]--;
            that.fillShape(this);
        } else if (x == 1 && y == 0) {
            if (!that.checkRight(this)) {
                return;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            this.first[0]++;
            this.second[0]++;
            this.third[0]++;
            this.fourth[0]++;
            that.fillShape(this);
        } else if (x == 0 && y == 1) {
            if (!that.checkBottom(this)) {
                that.clearInterval(that.dowm);
                that.fillMatrix();
                for (var i = 0; i < that.matrix.length; i++) {
                    if (that.matrix[i][0] === 1) {
                        alert('game over');
                        return;
                    }
                }
                that.checkMatrix();
                that.imageData = that.ctx.getImageData(0, 0, 500, 500);
                that.createNewShape(that.nextShape);
                that.createNextShape();
                return;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            this.first[1]++;
            this.second[1]++;
            this.third[1]++;
            this.fourth[1]++;
            that.fillShape(this);
        }
    }
    this.I = function (axle) {
        this.first = [axle[0], axle[1] - 2];
        this.second = [axle[0], axle[1] - 1];
        this.third = [axle[0], axle[1]];
        this.fourth = [axle[0], axle[1] + 1];
    };
    this.I.prototype = {
        constructor: that.I,
        transform: function () {
            for (var i = this.first[0]; i < this.first[0] + 4; i++) {
                for (var j = this.first[1]; j < this.first[1] + 4; j++) {
                    if (that.matrix[i][j] === 1) {
                        return;
                    }
                }
            }
            if (this.angle === undefined) {
                this.angle = Math.floor(Math.random()*2);
            } else {
                this.angle++;
                this.angle = this.angle%2;
            }
            switch (this.angle) {
                case 0:
                    if (this.first[1] > 16) {
                        return;
                    }
                    this.second[0] = this.first[0];
                    this.second[1] = this.first[1] + 1;
                    this.third[0] = this.first[0];
                    this.third[1] = this.first[1] + 2;
                    this.fourth[0] = this.first[0];
                    this.fourth[1] = this.first[1] + 3;
                    break;
                case 1:
                    this.second[0] = this.first[0] + 1;
                    this.second[1] = this.first[1];
                    this.third[0] = this.first[0] + 2;
                    this.third[1] = this.first[1];
                    this.fourth[0] = this.first[0] + 3;
                    this.fourth[1] = this.first[1];
                    break;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            that.fillShape(this);
        },
        move: move
    };
    this.L = function (axle) {
        this.first = [axle[0], axle[1] - 1];
        this.second = [axle[0], axle[1]];
        this.third = [axle[0], axle[1] + 1];
        this.fourth = [axle[0] + 1, axle[1] + 1];
    };
    this.L.prototype = {
        constructor: that.L,
        transform: function () {
            for (var i = this.second[0] - 1; i <= this.second[0] + 1; i++) {
                for (var j = this.second[1] - 1; j <= this.second[1] + 1; j++) {
                    if (that.matrix[i][j] === 1) {
                        return;
                    }
                }
            }
            if (this.angle === undefined) {
                this.angle = Math.floor(Math.random()*4);
            } else {
                this.angle++;
                this.angle = this.angle%4;
            }
            switch (this.angle) {
                case 0:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] - 1;
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] + 1;
                    this.fourth[0] = this.second[0] + 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
                case 1:
                    this.first[0] = this.second[0] - 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0] + 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0] + 1;
                    this.fourth[1] = this.second[1] - 1;
                    break;
                case 2:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] + 1;
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] - 1;
                    this.fourth[0] = this.second[0] - 1;
                    this.fourth[1] = this.second[1] - 1;
                    break;
                case 3:
                    this.first[0] = this.second[0] + 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0] - 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0] - 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            that.fillShape(this);
        },
        move: move
    };
    this.J = function (axle) {
        this.first = [axle[0], axle[1] - 1];
        this.second = [axle[0], axle[1]];
        this.third = [axle[0], axle[1] + 1];
        this.fourth = [axle[0] - 1, axle[1] + 1];
    };
    this.J.prototype = {
        constructor: that.J,
        transform: function () {
            for (var i = this.second[0] - 1; i <= this.second[0] + 1; i++) {
                for (var j = this.second[1] - 1; j <= this.second[1] + 1; j++) {
                    if (that.matrix[i][j] === 1) {
                        return;
                    }
                }
            }
            if (this.angle === undefined) {
                this.angle = Math.floor(Math.random()*4);
            } else {
                this.angle++;
                this.angle = this.angle%4;
            }
            switch (this.angle) {
                case 0:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] - 1;
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] + 1;
                    this.fourth[0] = this.second[0] - 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
                case 1:
                    this.first[0] = this.second[0] - 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0] + 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0] + 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
                case 2:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] + 1;
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] - 1;
                    this.fourth[0] = this.second[0] + 1;
                    this.fourth[1] = this.second[1] - 1;
                    break;
                case 3:
                    this.first[0] = this.second[0] + 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0] - 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0] - 1;
                    this.fourth[1] = this.second[1] - 1;
                    break;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            that.fillShape(this);
        },
        move: move
    };
    this.Z = function (axle) {
        this.first = [axle[0] - 1, axle[1]];
        this.second = [axle[0], axle[1]];
        this.third = [axle[0], axle[1] + 1];
        this.fourth = [axle[0] + 1, axle[1] + 1];
    };
    this.Z.prototype = {
        constructor: that.Z,
        transform: function () {
            for (var i = this.second[0] - 1; i <= this.second[0] + 1; i++) {
                for (var j = this.second[1] - 1; j <= this.second[1] + 1; j++) {
                    if (that.matrix[i][j] === 1) {
                        return;
                    }
                }
            }
            if (this.angle === undefined) {
                this.angle = Math.floor(Math.random()*2);
            } else {
                this.angle++;
                this.angle = this.angle%2;
            }
            switch (this.angle) {
                case 0:
                    this.first[0] = this.second[0] - 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] + 1;
                    this.fourth[0] = this.second[0] + 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
                case 1:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] - 1;
                    this.third[0] = this.second[0] - 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0] - 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            that.fillShape(this);
        },
        move: move
    };
    this.S = function (axle) {
        this.first = [axle[0] + 1, axle[1]];
        this.second = [axle[0], axle[1]];
        this.third = [axle[0], axle[1] + 1];
        this.fourth = [axle[0] - 1, axle[1] + 1];
    };
    this.S.prototype = {
        constructor: that.S,
        transform: function () {
            for (var i = this.second[0] - 1; i <= this.second[0] + 1; i++) {
                for (var j = this.second[1] - 1; j <= this.second[1] + 1; j++) {
                    if (that.matrix[i][j] === 1) {
                        return;
                    }
                }
            }
            if (this.angle === undefined) {
                this.angle = Math.floor(Math.random()*2);
            } else {
                this.angle++;
                this.angle = this.angle%2;
            }
            switch (this.angle) {
                case 0:
                    this.first[0] = this.second[0] + 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] + 1;
                    this.fourth[0] = this.second[0] - 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
                case 1:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] - 1;
                    this.third[0] = this.second[0] + 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0] + 1;
                    this.fourth[1] = this.second[1] + 1;
                    break;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            that.fillShape(this);
        },
        move: move
    };
    this.O = function (axle) {
        this.first = [axle[0], axle[1]];
        this.second = [axle[0] + 1, axle[1]];
        this.third = [axle[0], axle[1] + 1];
        this.fourth = [axle[0] + 1, axle[1] + 1];
    };
    this.O.prototype = {
        constructor: that.O,
        transform: function () {},
        move: move
    };
    this.T = function (axle) {
        this.first = [axle[0] - 1, axle[1]];
        this.second = [axle[0], axle[1]];
        this.third = [axle[0] + 1, axle[1]];
        this.fourth = [axle[0], axle[1] - 1];
    };
    this.T.prototype = {
        constructor: that.T,
        transform: function () {
            for (var i = this.second[0] - 1; i <= this.second[0] + 1; i++) {
                for (var j = this.second[1] - 1; j <= this.second[1] + 1; j++) {
                    if (that.matrix[i][j] === 1) {
                        return;
                    }
                }
            }
            if (this.angle === undefined) {
                this.angle = Math.floor(Math.random()*4);
            } else {
                this.angle++;
                this.angle = this.angle%4;
            }
            switch (this.angle) {
                case 0:
                    this.first[0] = this.second[0] - 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0] + 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0];
                    this.fourth[1] = this.second[1] - 1;
                    break;
                case 1:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] + 1;
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] - 1;
                    this.fourth[0] = this.second[0] - 1;
                    this.fourth[1] = this.second[1];
                    break;
                case 2:
                    this.first[0] = this.second[0] + 1;
                    this.first[1] = this.second[1];
                    this.third[0] = this.second[0] - 1;
                    this.third[1] = this.second[1];
                    this.fourth[0] = this.second[0];
                    this.fourth[1] = this.second[1] + 1;
                    break;
                case 3:
                    this.first[0] = this.second[0];
                    this.first[1] = this.second[1] - 1;
                    this.third[0] = this.second[0];
                    this.third[1] = this.second[1] + 1;
                    this.fourth[0] = this.second[0] + 1;
                    this.fourth[1] = this.second[1];
                    break;
            }
            that.ctx.putImageData(that.imageData, 0, 0);
            that.fillShape(this);
        },
        move: move
    };
    this.shape = [that.I, that.O, that.Z, that.L, that.J, that.S, that.T];
    this.imageData = null;
};
Tetris.prototype = {
    constructor: Tetris,
    init: function () {
        var that = this,
            width = 500,
            height = 500;
        this.initMatrix();
        this.imageData = this.ctx.getImageData(0, 0, width, height);
        this.createNextShape();
        this.drawPanel();
        this.updatePanel(this.score, this.highestScore);
        // this.drawGrid();
        this.imageData = this.ctx.getImageData(0, 0, width, height);
        this.createNewShape();
    },
    drawPanel: function () {
        var ctx = this.ctx;
        ctx.strokeStyle = '#ff0000';
        ctx.fillStyle = '#343434';
        ctx.font = 'bold 16px 黑体-简';
        ctx.moveTo(501.5, 0);
        ctx.lineTo(501.5, 500);
        ctx.stroke();
        ctx.fillText('下一个', 520, 30);
        ctx.fillText('A  左移', 520, 350);
        ctx.fillText('S  下移', 520, 380);
        ctx.fillText('D   右移', 520, 410);
        ctx.fillText('Space  变形', 520, 440);
    },
    updatePanel: function (score, highestScore) {
        var ctx = this.ctx;
        ctx.clearRect(510, 180, 180, 150);
        ctx.beginPath();
        ctx.fillStyle = '#343434';
        ctx.font = 'bold 16px 黑体-简';
        ctx.fillText('分数：' + score, 520, 230);
        ctx.fillText('最高分：' + highestScore, 520, 270);
        // ctx.fillRect(510, 180, 180, 150);
    },
    initMatrix: function () {
        for (var i = 0; i < 20; i++) {
            this.matrix[i] = [];
            for (var j = 0; j < 20; j++) {
                this.matrix[i][j] = 0;
            }
        }
    },
    drawGrid: function () {
        var ctx = this.ctx;
        ctx.strokeStyle = '#cccccc';
        for (var i = 25.5; i < 500; i+=25) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 500);
            ctx.stroke();
        }
        for (var i = 25.5; i < 500; i+=25) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(500, i);
            ctx.stroke();
        }
    },
    fillCell: function (x, y) {
        var ctx = this.ctx,
            size = this.size;
        ctx.fillStyle = '#343434';
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.fillRect(x*size+1, y*size+1, size-1, size-1);
        ctx.strokeRect(x*size+0.5, y*size+0.5, size, size);
        ctx.closePath();
    },
    clearCell: function (x, y) {
        var ctx = this.ctx,
            size = this.size;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.fillRect(x*size+1, y*size+1, size, size);
        ctx.closePath();
    },
    fillShape: function (obj) {
        for (var i in obj) {
            if (obj[i] instanceof Array) {
                this.fillCell(obj[i][0], obj[i][1]);
            }
        }
    },
    checkBottom: function (obj) {
        var flag = true;
        for (var i in obj) {
            if (obj[i] instanceof Array) {
                if (obj[i][1] + 1 > 19 || this.matrix[obj[i][0]][obj[i][1] + 1] === 1) {
                    flag = false;
                }
            }
        }
        if (flag === false) {
            for (var i in obj) {
                if (obj[i] instanceof Array) {
                    this.matrix[obj[i][0]][obj[i][1]] = 1;
                }
            }
        }
        return flag;
    },
    checkLeft: function (obj) {
        var flag = true;
        for (var i in obj) {
            if (obj[i] instanceof Array) {
                if (obj[i][0] - 1 < 0 || this.matrix[obj[i][0] - 1][obj[i][1]] === 1) {
                    flag = false;
                }
            }
        }
        return flag;
    },
    checkRight: function (obj) {
        var flag = true;
        for (var i in obj) {
            if (obj[i] instanceof Array) {
                if (obj[i][0] + 1 > 19 || this.matrix[obj[i][0] + 1][obj[i][1]] === 1) {
                    flag = false;
                }
            }
        }
        return flag;
    },
    fillMatrix: function () {
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                if (this.matrix[i][j] === 1) {
                    this.fillCell(i, j);
                } else {
                    this.clearCell(i, j);
                }
            }
        }
    },
    createNewShape: function (shape) {
        var that = this;
        if (!arguments.length) {
            this.nowShape = new this.shape[Math.floor(Math.random()*7)](this.axle);
            // this.nowShape = new this.O(this.axle);
            this.nowShape.transform();
        } else {
            this.nowShape = shape;
        }
        this.down = setInterval(function () {
            that.ctx.putImageData(that.imageData, 0, 0);
            that.nowShape.move(0, 1);
        }, 500);
    },
    createNextShape: function () {
        this.nextShape = new this.shape[Math.floor(Math.random()*7)](this.axle);
        // this.nextShape = new this.O(this.axle);
        this.nextShape.transform();
        var ctx = this.ctx;
        ctx.clearRect(530, 30, 150, 150);
        ctx.beginPath();
        ctx.fillStyle = '#343434';
        ctx.strokeStyle = '#ffffff';
        var array = {};
        for (var i in this.nextShape) {
            if (this.nextShape[i] instanceof Array) {
                array[i] = [];
                array[i][0] = this.nextShape[i][0] - 9;
                array[i][1] = this.nextShape[i][1] + 2;
            }
        }
        for (var i in array) {
            ctx.fillRect(array[i][0]*20 + 551, array[i][1]*20 + 101, 19, 19);
            ctx.strokeRect(array[i][0]*20 + 550.5, array[i][1]*20 + 100.5, 20, 20)
        }
        return this.nextShape;
    },
    clearInterval: function () {
        clearInterval(this.down);
    },
    checkMatrix: function () {
        var len1 = this.matrix.length,
            len2 = this.matrix[0].length,
            flag,
            line = [];
        for (var i = 0; i < len1; i++) {
            flag = 1;
            for (var j = 0; j < len2; j++) {
                if (this.matrix[j][i] === 0) {
                    flag = 0;
                    break;
                }
            }
            if (flag === 1) {
                line.push(i);
            }
        }
        if (line.length) {
            for (var i in line) {
                for (var j = 0; j < len1; j++) {
                    this.matrix[j].splice(line[i], 1);
                    this.matrix[j].unshift(0);
                }
                this.fillMatrix();
                this.imageData = this.ctx.getImageData(0, 0, 500, 500);
                this.ctx.putImageData(this.imageData, 0, 0);
            }
            this.score += line.length*100;
            this.updatePanel(this.score, this.highestScore);
        }
    }
};
window.onload = function () {
    var canvas = document.getElementById('canvas'),
        myTetries = new Tetris(canvas);
    myTetries.init();
    document.onkeypress = function (e) {
        switch (e.keyCode) {
            case 65:
            case 97:
                myTetries.nowShape.move(-1, 0);
                break;
            case 83:
            case 115:
                myTetries.nowShape.move(0, 1);
                break;
            case 68:
            case 100:
                myTetries.nowShape.move(1, 0);
                break;
            case 32:
                e.preventDefault();
                myTetries.nowShape.transform();
                break;
        }
    };
};