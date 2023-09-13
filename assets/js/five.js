function showGenderInput() {
  var name = document.getElementById("name").value;

  if (name.trim() === "") {
    alert("이름을 입력해주세요.");
    return;
  }

  document.getElementById("name_container").classList.add("hidden");
  document.getElementById("gender_container").classList.remove("hidden");
}

function showBirthdayInput() {
  var gender = document.getElementById("gender").value;

  if (gender === "") {
    alert("성별을 선택해주세요.");
    return;
  }

  document.getElementById("gender_container").classList.add("hidden");
  document.getElementById("birthday_container").classList.remove("hidden");
}

function calculateElement() {
  var name = document.getElementById("name").value;
  var gender = document.getElementById("gender").value;
  var birthday = document.getElementById("birthday").value;

  // 생년월일을 Date 객체로 변환
  var birth = new Date(birthday);

  var year = birth.getFullYear();
  var month = birth.getMonth() + 1;
  var day = birth.getDate();
  var sum = year + month + day;
  var element = sum % 10;

  var elementName, description, imageSrc, pageUrl;
  switch (element) {
    case 0:
    case 5:
        elementName = "흙";
      description = "꼼꼼하고 실용적이며 안정감 있는 사람,<br>노력과 인내력이 강한 성격입니다. ";
      imageSrc = "assets/image/sand.png"
      pageUrl = "assets/card/sand.html";
      break;
    case 1:
    case 6:
   
      elementName = "금";
      description = "규칙적이고 참을성 있으며,<br>믿음직스러운 인물입니다.";
      imageSrc = "assets/image/gold.png";
      pageUrl = "assets/card/gold.html";
      break;
    case 2:
    case 7:
        elementName = "물";
      description = "예민하고 직감적인 사람,영감적이고 상상력이 풍부하며,<br>재치가 있으며 융통성이 있습니다.";
      imageSrc = "assets/image/water.png";
      pageUrl = "assets/card/water.html";
      break;
    case 3:
    case 8:
   
      elementName = "나무";
      description = "활발하고 에너지가 넘치며,<br>도전적인 성향이 있습니다.";
      imageSrc = "assets/image/tree.png";
      pageUrl = "assets/card/tree.html";
      break;
    case 4:
    case 9:
        elementName = "불";
      description = "열정적이고 자신감이 높으며,<br>적극적인 태도를 가지고 있습니다.";
      imageSrc = "assets/image/fire.png";
      pageUrl = "assets/card/fire.html";
      break;
  }

  var resultText =
    "안녕하세요, " +
    gender +
    " " +
    name +
    "님!<br>" +
    "당신의 오행은 " +
    elementName +
    "입니다.<br><br>" +
    "이 오행의 사람은<br>" +
    description +
    "<br><br>" +
    "<a href='" + pageUrl + "'>더보기</a>";


  document.getElementById("result").innerHTML = resultText;
  document.getElementById("elementImg").src = imageSrc;

  document.getElementById("birthday_container").classList.add("hidden");
  document.getElementById("result_container").classList.remove("hidden");
}