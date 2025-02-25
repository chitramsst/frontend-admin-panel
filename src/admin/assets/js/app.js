  // Wait for all scripts to load before loading HTML content
  document.addEventListener("DOMContentLoaded", function () {
    // Check if all scripts are loaded (this example assumes they're loaded from CDNs)
    const checkScriptsLoaded = () => {
      if (typeof feather !== "undefined" && typeof Alpine !== "undefined") {
        loadHTMLContent();
      } else {
        setTimeout(checkScriptsLoaded, 100); // Retry every 100ms
      }
    };

    // Start checking if all scripts are loaded
    checkScriptsLoaded();

    // Function to load the HTML content dynamically after scripts are ready
    function loadHTMLContent() {
      // Load the header, footer, or any other content dynamically
      fetch("/src/admin/header.html")
        .then((response) => response.text())
        .then((headerHTML) => {
          document.querySelector("#header-container").innerHTML =
            headerHTML;
          feather.replace(); // Replace feather icons in the loaded HTML
        })
        .catch((error) => console.error("Error loading header:", error));
    }

    // Load the header, footer, or any other content dynamically
    fetch("/src/admin/sidebar.html")
      .then((response) => response.text())
      .then((sidebarHTML) => {
        document.querySelector("#sidebar-container").innerHTML =
          sidebarHTML;
        feather.replace();
      })
      .catch((error) => console.error("Error loading header:", error));

    // Load the header, footer, or any other content dynamically
    fetch("content.html")
      .then((response) => response.text())
      .then((contentHTML) => {
        document.querySelector("#content-container").innerHTML =
          contentHTML;
        feather.replace();
        const ctx = document.getElementById("salesChart").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
              {
                label: "Sales",
                data: [12, 19, 8, 17, 10],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true },
            },
          },
        });
      })
      .catch((error) => console.error("Error loading header:", error));
  });