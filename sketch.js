let input;
let slider;
let sliderLabel;
let button;
let isBouncing = false;
let iframe;
let dropdown;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.size(200);
  input.value('Yuan');
  
  slider = createSlider(28, 50, 32);
  slider.position(input.x + input.width + 10, 10);
  
  sliderLabel = createDiv('文字大小: ' + slider.value() + 'px');
  sliderLabel.position(slider.x + slider.width + 10, 10);
  sliderLabel.style('color', 'white');
  
  button = createButton('跳動');
  button.position(sliderLabel.x + sliderLabel.width + 10, 10);
  button.mousePressed(toggleBounce);

  dropdown = createSelect();
  dropdown.position(10, 40);
  dropdown.option('主頁', 'none'); // 新增「主頁」選項
  dropdown.option('教育科技學系', 'https://www.et.tku.edu.tw/');
  dropdown.changed(updateIframe);

  iframe = createElement('iframe');
  iframe.attribute('width', '800');
  iframe.attribute('height', '600');
  iframe.style('border', 'none'); // 移除邊框
  iframe.hide(); // 預設隱藏 iframe
  centerIframe(); // 設定 iframe 的位置為正中央
}

function draw() {
  background(0); // 設置背景顏色為黑色
  fill(0); // 設置文字顏色為黑色
  rect(0, 0, width, 40); // 清空滑桿那一行的背景
  fill(255); // 設置文字顏色為白色
  let textValue = input.value();
  let textSizeValue = slider.value();
  textAlign(LEFT, TOP);
  textSize(textSizeValue);
  
  sliderLabel.html('文字大小: ' + textSizeValue + 'px');
  
  let y = 40; // 從40開始，避免覆蓋滑桿那一行
  while (y < height) {
    let x = 0;
    while (x < width) {
      let offset = isBouncing ? sin(frameCount * 0.1 + x * 0.05) * 10 : 0;
      text(textValue, x, y + offset);
      x += textWidth(textValue) + 20; // 每行之間的間距
    }
    y += textSizeValue + 10; // 每行之間的間距
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerIframe(); // 當視窗大小改變時重新置中 iframe
}

function centerIframe() {
  let iframeX = (windowWidth - 800) / 2;
  let iframeY = (windowHeight - 600) / 2;
  iframe.position(iframeX, iframeY);
}

function updateIframe() {
  let selectedUrl = dropdown.value();
  if (selectedUrl === 'none') {
    iframe.hide(); // 隱藏 iframe
  } else if (selectedUrl === 'https://www.et.tku.edu.tw/') {
    iframe.attribute('src', selectedUrl); // 更新 iframe 的網址
    iframe.show(); // 顯示 iframe
  }
}
