document.addEventListener('DOMContentLoaded', function () {
  function getData(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        return 'Error: Unable to load the content.';
      });
  }

  var fileLinks = document.getElementsByClassName('fileLink');

  for (var i = 0; i < fileLinks.length; i++) {
    fileLinks[i].addEventListener('click', async function (event) {
      event.preventDefault();
      var fileUrl = this.getAttribute('href');

      try {
        const content = await getData(fileUrl);
        document.getElementById('overlayContent').innerText = content;
        document.getElementById('modal').style.display = 'block';
        document.getElementById('overlayContent').style.display = 'block'; // Show the overlayContent
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('overlayContent').innerText = 'Error: Unable to load the content.';
        document.getElementById('modal').style.display = 'block';
        document.getElementById('overlayContent').style.display = 'block'; // Show the overlayContent
      }
    });
  }

  // Move closeModal variable and event listener inside DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    var closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', function () {
      document.getElementById('modal').style.display = 'none';
      document.getElementById('overlayContent').style.display = 'none'; // Hide the overlayContent
    });

    window.addEventListener('click', function (event) {
      if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('overlayContent').style.display = 'none'; // Hide the overlayContent
      }
    });
  });

  // Close the modal when clicking outside the content area
  document.getElementById('modal').addEventListener('click', function (event) {
    if (event.target.id === 'modal') {
      modal.style.display = 'none';
    }
  });
});
