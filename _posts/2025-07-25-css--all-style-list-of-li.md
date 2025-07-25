---
title: "All style list of li (brower chrome)"
date: 2025-07-25
layout: post
---

All value of style list ul li 
```
arabic-indic
auto
bengali
cambodian
circle
cjk-earthly-branch
cjk-heavenly-stem
cjk-ideographic
decimal
decimal-leading-zero
devanagari
disc
ethiopic-halehame
ethiopic-halehame-am
ethiopic-halehame-ti-er
ethiopic-halehame-ti-et
georgian
gujarati
gurmukhi
hangul
hangul-consonant
hebrew
hiragana
hiragana-iroha
inside
kannada
katakana
katakana-iroha
khmer
korean-hangul-formal
korean-hanja-formal
korean-hanja-informal
lao
lower-alpha
lower-armenian
lower-greek
lower-latin
lower-roman
malayalam
mongolian
myanmar
oriya
outside
persian
simp-chinese-formal
simp-chinese-informal
square
telugu
thai
tibetan
trad-chinese-formal
trad-chinese-informal
upper-alpha
upper-armenian
upper-latin
upper-roman
urdu
inherit
initial
revert
revert-layer
unset
```


<label for="styleSelect">Chọn kiểu list-style-type:</label> <span id="selectat"></span>
  <br>
  <br>
  <select id="styleSelect" size="10" style="float:left;margin-right:40px;"></select>

  <ul id="exampleList">
    <li>Danh sách 1</li>
    <li>Danh sách 2</li>
    <li>Danh sách 3</li>
    <li>Danh sách 4</li>
    <li>Danh sách 5</li>
    <li>Danh sách 6</li>
    <li>Danh sách 7</li>
    <li>Danh sách 8</li>
  </ul>

  <script>
    const styles = [
      "arabic-indic", "auto", "bengali", "cambodian", "circle", "cjk-earthly-branch",
      "cjk-heavenly-stem", "cjk-ideographic", "decimal", "decimal-leading-zero",
      "devanagari", "disc", "ethiopic-halehame", "ethiopic-halehame-am",
      "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "georgian", "gujarati",
      "gurmukhi", "hangul", "hangul-consonant", "hebrew", "hiragana", "hiragana-iroha",
      "inside", "kannada", "katakana", "katakana-iroha", "khmer", "korean-hangul-formal",
      "korean-hanja-formal", "korean-hanja-informal", "lao", "lower-alpha", "lower-armenian",
      "lower-greek", "lower-latin", "lower-roman", "malayalam", "mongolian", "myanmar",
      "oriya", "outside", "persian", "simp-chinese-formal", "simp-chinese-informal",
      "square", "telugu", "thai", "tibetan", "trad-chinese-formal", "trad-chinese-informal",
      "upper-alpha", "upper-armenian", "upper-latin", "upper-roman", "urdu",
      "inherit", "initial", "revert", "revert-layer", "unset"
    ];

    const select = document.getElementById("styleSelect");
    const list = document.getElementById("exampleList");

    // Tạo các option trong select
    styles.forEach((style, index) => {
        console.log(style);
      const option = document.createElement("option");
      option.value = style;
      option.textContent = index+1+" "+style;
      select.appendChild(option);
    });

    // Gán sự kiện khi thay đổi kiểu
    select.addEventListener("change", function () {
      list.style.listStyleType = this.value;
      document.getElementById('selectat').innerHTML=this.value;
    });
  </script>
