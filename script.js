// 動画データリスト
let videos = [];

// ページ初期化
function init() {
    loadVideos();
    displayVideos();
}

// ローカルストレージから動画を読み込む
function loadVideos() {
    const storedVideos = localStorage.getItem("videos");
    if (storedVideos) {
        videos = JSON.parse(storedVideos);
    }
}

// ローカルストレージに動画を保存する
function saveVideos() {
    localStorage.setItem("videos", JSON.stringify(videos));
}

// 動画を表示する
function displayVideos() {
    const container = document.getElementById("video-container");
    container.innerHTML = ""; // コンテナをクリア
    videos.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}">
            <h3>${video.title}</h3>
            <button class="play-button" data-id="${video.id}">再生</button>
        `;
        container.appendChild(videoCard);
    });

    // 再生ボタンにイベントを追加
    document.querySelectorAll(".play-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const videoId = e.target.getAttribute("data-id");
            openModal(videoId);
        });
    });
}

// モーダルウィンドウを開く
function openModal(videoId) {
    const modal = document.getElementById("modal");
    const player = document.getElementById("player");
    player.src = `https://www.youtube.com/embed/${videoId}`;
    modal.classList.remove("hidden");
}

// モーダルウィンドウを閉じる
function closeModal() {
    const modal = document.getElementById("modal");
    const player = document.getElementById("player");
    player.src = ""; // 動画停止
    modal.classList.add("hidden");
}

// 動画追加フォームの処理
document.getElementById("video-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("video-title");
    const idInput = document.getElementById("video-id");

    const newVideo = {
        title: titleInput.value.trim(),
        id: idInput.value.trim()
    };

    if (newVideo.title && newVideo.id) {
        videos.push(newVideo); // 動画をリストに追加
        saveVideos(); // 保存
        displayVideos(); // 再表示
        titleInput.value = ""; // フォームをリセット
        idInput.value = "";
    } else {
        alert("動画タイトルとIDを正しく入力してください!");
    }
});

// モーダルの閉じるボタン
document.getElementById("close-modal").addEventListener("click", closeModal);

// ページ読み込み時に初期化
window.addEventListener("load", init);
