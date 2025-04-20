function identifyPlant() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];

  if (!file) {
    alert("Please upload an image first.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = function () {
    const base64Image = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");

    fetch("https://plant.id/api/v3/identification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": "nwkNBmtHEJXZkp8uTf3jFlJLjTmx9fbaIaCcgvBsFBMaoNjNzr"
      },
      body: JSON.stringify({
        images: [base64Image],
        latitude: 49.207,
        longitude: 16.608,
        similar_images: true
      })
    })
    .then(response => response.json())
    .then(data => {
      const result = document.getElementById("result");
      const plant = data?.result?.classification?.suggestions[0];

      if (plant) {
        result.innerHTML = `
          <h3>Plant Identified: ${plant.name}</h3>
          <img src="${plant?.similar_images[0]?.url}" alt="${plant.name}" />
        `;
      } else {
        result.innerHTML = "Sorry, plant not identified.";
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  reader.readAsDataURL(file);

  const preview = document.getElementById("preview");
  preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Preview" />`;
}
