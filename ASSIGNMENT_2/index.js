const plantImageInput = document.getElementById('plant-image');
const imagePreview = document.getElementById('image-preview');
const resultDiv = document.getElementById('result');
const identifyBtn = document.getElementById('identify-btn');

plantImageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Plant Preview">`;
      resultDiv.textContent = "Plant name will appear here";
    };

    reader.readAsDataURL(file);
  }
});

identifyBtn.addEventListener('click', function () {
  if (plantImageInput.files.length === 0) {
    alert("Please upload a plant image first.");
  } else {
    // Placeholder result
    resultDiv.textContent = "🌸 Identified Plant: Rose";
  }
});
