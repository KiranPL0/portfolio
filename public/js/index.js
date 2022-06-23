document.addEventListener("click", musicPlay);
function musicPlay() {
  document.getElementById("music").play();
  document.getElementById("playmusic").classList.add("hidden");
  setTimeout(function () {
    document.getElementById("playmusic").style.display = "none";
    document.getElementById("links").style.display = "block";
    document.getElementById("links").classList.add("visible");
  }, 2000);
  document.removeEventListener("click", musicPlay);
}

async function getData() {
  const response = await fetch("./api/currently-playing");
  //   console.log(response.text());
  if (response.status == 418) {
    document.getElementById("image").src = "../img/default.jpg";
    document.getElementById("song").innerHTML = "No song playing";
  } else {
    const data = await response.json();
    //   console.log("INFO \n", data);
    //   console.log("INFO \n", data.artist);
    //   console.log("INFO \n", data.song);
    //   console.log("INFO \n", data.album);
    //   console.log("INFO \n", data.image);
    document.getElementById("artist").innerHTML = data.artist;
    document.getElementById("song").innerHTML = data.song;
    document.getElementById("album").innerHTML = data.album;
    if ((data.image.length == 0) | (data.image == null)) {
      document.getElementById("image").src = "../img/default.jpg";
    } else {
      document.getElementById("image").src = data.image;
    }
    if ((data.album.length == 0) | (data.album == null)) {
      document.getElementById("album").hidden = true;
    } else {
      document.getElementById("album").innerHTML = data.album;
      document.getElementById("album").hidden = false;
    }
  }
}

getData();
