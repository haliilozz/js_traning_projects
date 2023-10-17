const searchInput = document.getElementById("searchText");
const searchBtn = document.querySelector("#button");
const cardsDiv = document.querySelector(".cards");

searchBtn.addEventListener("click", () => {
  if (searchInput.value) {
    console.log(searchInput.value);
    getData(searchInput.value);
    cardsDiv.innerHTML = "";
  } else {
    alert("lütfen bir kullanıcı adı giriniz");
  }
});

async function getData(username) {
  console.log(username);
  const url = `https://api.github.com/users/${username}/followers?per_page=100`;
  try {
    let response = await fetch(url);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      data.forEach((user) => createElem(user));
    } else {
      cardsDiv.innerHTML = `<h1 class="text-danger">Kullanıcı bulunamadı</h1>`;
    }
  } catch (error) {
    console.log(error);
  }
}

function createElem(user) {
  const { login, avatar_url, html_url } = user;
  let cardCol = document.createElement("div");
  cardCol.className = "col";
  let cardDiv = document.createElement("div");
  cardDiv.className = "card";
  let cardImg = document.createElement("img");
  cardImg.src = avatar_url;
  cardImg.className = "card-img-top";
  cardImg.alt = login;
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let cardTitle = document.createElement("h5");
  cardTitle.innerText = login;
  let cardBtn = document.createElement("a");
  cardBtn.className = "btn btn-dark";
  cardBtn.innerText = "view profile";
  cardBtn.target = "_blank";
  cardBtn.setAttribute("href", html_url);
  cardCol.appendChild(cardDiv);
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardBtn);

  cardsDiv.appendChild(cardCol);
}
