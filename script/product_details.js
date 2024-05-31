let currentImageIndex = 0;
const images = [
    '../images/black_chair.png',
    '../images/lamp.png',
    
];

function showImage(index) {
    const imageElement = document.getElementById('productImage');
    imageElement.src = images[index];
}

function prevImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
    showImage(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
    showImage(currentImageIndex);
}

// Initialize the first image
showImage(currentImageIndex);
