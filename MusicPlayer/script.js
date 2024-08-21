const playlist = [
    { title: "Song 1", file: "Tom Odell   Another Love (No copyright music).mp3" },
    { title: "Song 2", file: "VØJ, Narvent - Memory Reboot (Music Video).mp3" },
    { title: "Song 3", file: "who do you cry for_.mp3" }
  ];
  
  let currentTrackIndex = 0;
  
  const audioPlayer = document.getElementById("audio-player");
  const playlistElement = document.getElementById("playlist");
  const currentTitleElement = document.getElementById("current-title");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const volumeControl = document.getElementById("volume-control");
  const searchInput = document.getElementById("search-input");
  
  // Load playlist
  function loadPlaylist() {
    playlistElement.innerHTML = "";
    playlist.forEach((track, index) => {
      const li = document.createElement("li");
      li.textContent = track.title;
      li.addEventListener("click", () => {
        currentTrackIndex = index;
        loadTrack();
        playAudio();
      });
      playlistElement.appendChild(li);
    });
  }
  
  // Load current track
  function loadTrack() {
    audioPlayer.src = playlist[currentTrackIndex].file;
    currentTitleElement.textContent = playlist[currentTrackIndex].title;
    updateActiveTrack();
  }
  
  // Update active track
  function updateActiveTrack() {
    const items = playlistElement.querySelectorAll("li");
    items.forEach((item, index) => {
      item.classList.toggle("active", index === currentTrackIndex);
    });
  }
  
  // Play/Pause toggle
  function playAudio() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playBtn.textContent = "⏸️";
    } else {
      audioPlayer.pause();
      playBtn.textContent = "▶️";
    }
  }
  
  // Next track
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack();
    playAudio();
  }
  
  // Previous track
  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack();
    playAudio();
  }
  
  // Search function
  function searchMusic() {
    const searchTerm = searchInput.value.toLowerCase();
    playlistElement.innerHTML = "";
    playlist
      .filter(track => track.title.toLowerCase().includes(searchTerm))
      .forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = track.title;
        li.addEventListener("click", () => {
          currentTrackIndex = index;
          loadTrack();
          playAudio();
        });
        playlistElement.appendChild(li);
      });
  }
  
  // Event listeners
  playBtn.addEventListener("click", playAudio);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value;
  });
  searchInput.addEventListener("input", searchMusic);
  
  // Initialize player
  loadPlaylist();
  loadTrack();
  