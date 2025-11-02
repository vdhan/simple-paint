class Ve {
  congCu = 'but';
  dangVe = false;
  t = false;
  co = 20;

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d', {willReadFrequently: true});

    this.canvas.addEventListener('mousedown', (e) => {
      this.preX = e.pageX - this.canvas.offsetLeft;
      this.preY = e.pageY - this.canvas.offsetTop;
      this.dangVe = true;

      if (this.congCu == 'gom') {
        this.context.clearRect(this.preX - 10, this.preY - 10, this.co, this.co);
        this.capNhat();
      }

      if (this.congCu == 'duong' || this.congCu == 'chuNhat' || this.congCu == 'tron') {
        this.capNhat();
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      let x = e.pageX - this.canvas.offsetLeft;
      let y = e.pageY - this.canvas.offsetTop;
      if (this.dangVe) {
        if (this.congCu == 'but') {
          this.context.moveTo(this.preX, this.preY);
          this.context.lineTo(x, y);
          this.context.stroke();
          this.preX = x;
          this.preY = y;
        } else if (this.congCu == 'duong') {
          this.canvas.width = this.canvas.width;
          this.context.putImageData(this.duLieu, 0, 0);

          this.context.moveTo(this.preX, this.preY);
          this.context.lineTo(x, y);
          this.context.stroke();
        } else if (this.congCu == 'chuNhat') {
          this.canvas.width = this.canvas.width;
          this.context.putImageData(this.duLieu, 0, 0);

          let trai, tren;
          let ngang = Math.abs(this.preX - x);
          let cao = Math.abs(this.preY - y);
          if (this.preX < x) {
            trai = this.preX;
          } else {
            trai = x;
          }

          if (this.preY < y) {
            tren = this.preY;
          } else {
            tren = y;
          }

          this.context.strokeRect(trai, tren, ngang, cao);
        } else if (this.congCu == 'tron') {
          this.canvas.width = this.canvas.width;
          this.context.putImageData(this.duLieu, 0, 0);

          let r, cx, cy;
          let dx = Math.abs(this.preX - x) / 2;
          let dy = Math.abs(this.preY - y) / 2;

          if (dx < dy) {
            r = dx;
            cx = (this.preX + x) / 2;
            if (this.preY < y) {
              cy = this.preY + r;
            } else {
              cy = this.preY - r;
            }
          } else {
            r = dy;
            cy = (this.preY + y) / 2;
            if (this.preX < x) {
              cx = this.preX + r;
            } else {
              cx = this.preX - r;
            }
          }

          this.context.beginPath();
          this.context.arc(cx, cy, r, 0, 2 * Math.PI);
          this.context.stroke();
        } else if (this.congCu == 'gom') {
          this.context.clearRect(x - 10, y - 10, this.co, this.co);
          this.capNhat();
        }
      } else {
        if (this.congCu == 'gom') {
          this.canvas.width = this.canvas.width;
          this.context.putImageData(this.duLieu, 0, 0);
          if (x > 0 && y > 0 && x < this.canvas.width && y < this.canvas.height) {
            this.context.strokeRect(x - 9, y - 9, this.co - 2, this.co - 2);
          }
        }
      }
    });

    this.canvas.addEventListener('mouseup', (e) => {
      let x = e.pageX - this.canvas.offsetLeft;
      let y = e.pageY - this.canvas.offsetTop;
      if (this.congCu == 'duong') {
        this.context.moveTo(this.preX, this.preY);
        this.context.lineTo(x, y);
        this.context.stroke();
      } else if (this.congCu == 'chuNhat') {
        let trai, tren;
        let ngang = Math.abs(x - this.preX);
        let cao = Math.abs(y - this.preY);

        if (this.preX < x) {
          trai = this.preX;
        } else {
          trai = x;
        }

        if (this.preY < y) {
          tren = this.preY;
        } else {
          tren = y;
        }

        this.context.strokeRect(trai, tren, ngang, cao);
      } else if (this.congCu == 'tron') {
        let r, cx, cy;
        let dx = Math.abs(this.preX - x) / 2;
        let dy = Math.abs(this.preY - y) / 2;
        if (dx < dy) {
          r = dx;
          cx = (this.preX + x) / 2;
          if (this.preY < y) {
            cy = this.preY + r;
          } else {
            cy = this.preY - r;
          }
        } else {
          r = dy;
          cy = (this.preY + y) / 2;
          if (this.preX < x) {
            cx = this.preX + r;
          } else {
            cx = this.preX - r;
          }

          this.context.beginPath();
          this.context.arc(cx, cy, r, 0, 2 * Math.PI);
          this.context.stroke();
        }
      }

      this.dangVe = false;
    });

    this.canvas.addEventListener('mouseenter', () => {
      if (this.congCu == 'gom') {
        if (this.t == false) {
          this.capNhat();
          this.t = true;
        }
      } else {
        this.t = false;
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      window.onmouseup = () => {
        this.dangVe = false;
      }
    });
  }

  datCongCu(congCuMoi) {
    this.congCu = congCuMoi;
  }

  taoMoi() {
    let dai = document.getElementById('dai').value;
    let rong = document.getElementById('rong').value;
    this.canvas.width = +dai >= 1 ? dai : 600;
    this.canvas.height = +rong >= 1 ? rong : 400;
    this.capNhat();
  }

  xoaHet() {
    this.canvas.width = this.canvas.width;
    this.capNhat();
  }

  capNhat() {
    this.duLieu = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let ve = new Ve();
  let radios = document.querySelectorAll('[name="cong-cu"]');
  for (let radio of radios) {
    radio.addEventListener('change', function () {
      ve.datCongCu(this.value);
    });
  }

  let tao = document.getElementById('tao');
  tao.addEventListener('click', () => {
    ve.taoMoi();
  });

  let xoa = document.getElementById('xoa');
  xoa.addEventListener('click', () => {
    ve.xoaHet();
  });

  let nam = new Date().getFullYear();
  let p = document.createElement('p');
  p.textContent = `Bản quyền © 2012 - ${nam} Vũ Đắc Hoàng Ân`;

  let footer = document.querySelector('footer');
  footer.appendChild(p);
});