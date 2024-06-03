document.addEventListener("DOMContentLoaded", function () {
  // Contact Us form submission
  document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const terms = document.getElementById("terms").checked;

    if (email === "" || firstName === "" || lastName === "" || !terms) {
      alert("Please fill all the fields and agree to the terms and conditions");
    } else {
      try {
        const response = await fetch("https://getform.io/your-endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            terms,
          }),
        });

        if (response.ok) {
          alert("Form submitted successfully");
        } else {
          alert("There was an error submitting the form");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error submitting the form");
      }
    }
  });

  // Slider functionality
  let currentIndex = 0;
  const items = document.querySelectorAll(".slider-item");
  const totalItems = items.length;
  const dots = document.querySelectorAll(".dot");
  let interval;

  function updateSlider() {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    sliderWrapper.style.transform = `translateX(-${
      currentIndex * (370 + 30)
    }px)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function startSlider() {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateSlider();
    }, 3000);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  function jumpToSlide(index) {
    currentIndex = index;
    updateSlider();
    stopSlider();
    setTimeout(startSlider, 3000);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => jumpToSlide(index));
  });

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      stopSlider();
    });
    item.addEventListener("mouseleave", () => {
      startSlider();
    });
  });

  startSlider();

  document.querySelectorAll(".read_more_btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(this.href, "_blank");
    });
  });

  // 'Our Project' section functionality
  function showProject(target) {
    const project1 = document.getElementById("project_1");
    const project2 = document.getElementById("project_2");
    const project3 = document.getElementById("project_3");
    const projectImage = document.getElementById("project_image");

    project1.classList.remove("active");
    project2.classList.remove("active");
    project3.classList.remove("active");
    target.classList.add("active");

    if (target.id === "project_1") {
      projectImage.src = "assets/1-2.png";
    } else if (target.id === "project_2") {
      projectImage.src = "assets/image.png";
    } else if (target.id === "project_3") {
      projectImage.src = "assets/2-2.png";
    }
  }

  document.querySelectorAll(".image_desc_box").forEach((box) => {
    box.addEventListener("click", function () {
      showProject(this);
    });
  });

  // 'Experts Growth' section hover highlight
  document.querySelectorAll(".expert_box").forEach((box) => {
    box.addEventListener("mouseenter", function () {
      this.classList.add("highlight");
    });
    box.addEventListener("mouseleave", function () {
      this.classList.remove("highlight");
    });
  });
});
