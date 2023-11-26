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

  function addEventToLinks(className, callback) {
    var links = document.getElementsByClassName(className);
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', callback);
    }
  }

  var modalContentElement = document.getElementById('txt-modal-content');
  var intervalId; // Declare intervalId variable

  addEventToLinks('fileLink', async function (event) {
    event.preventDefault();
    if (intervalId) {
      clearInterval(intervalId); // Clear any existing intervals
    }
    var fileUrl = this.getAttribute('href');
    await handleFetchContent(fileUrl);
  });
  
  addEventToLinks('article-title', function (event) {
  event.preventDefault();
  var fileUrl = this.getAttribute('data-file-url');
  handleFetchContent(fileUrl);
});

  addEventToLinks('fileLink-pb', async function (event) {
    event.preventDefault();
    if (intervalId) {
      clearInterval(intervalId); // Clear any existing intervals
    }
    var fileUrl = this.getAttribute('href');
    await handleFetchContent(fileUrl);

    // add a timer to change the modal content every 5 seconds
    intervalId = setInterval(async function () {
      modalContentElement.style.filter = 'blur(5px)'; // Apply blur effect

      // Change the content back to original after 0.5 seconds
      setTimeout(async function () {
        modalContentElement.style.filter = 'none'; // Remove blur effect
        // More reliable way to append "-pb" before the file extension
        var pbFileUrl = fileUrl.slice(0, fileUrl.lastIndexOf(".")) + "-pb" + fileUrl.slice(fileUrl.lastIndexOf("."));
        await handleFetchContent(pbFileUrl);
        
        // After 1 second, blur the modal again
        setTimeout(function () {
          modalContentElement.style.filter = 'blur(5px)'; // Apply blur effect
          
          // After another 0.5 second, revert to the original content
          setTimeout(async function () {
            modalContentElement.style.filter = 'none'; // Remove blur effect
            await handleFetchContent(fileUrl);
          }, 500);
        }, 1000);
      }, 500);
    }, 6000); // Changed the interval to 6 seconds to cover the full cycle
  });
  
async function handleFetchContent(fileUrl) {
  try {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    let content;

    if (fileExtension === 'pdf') {
      // Handle PDFs
      console.log('PDF link clicked:', fileUrl);
    } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      // Handle JPG images
      const textFileUrl = fileUrl.replace(/\.(jpg|jpeg)$/, '.txt');
      const textResponse = await fetch(textFileUrl);
      const textContent = await textResponse.text();
      
      // Prepare text content for measurement
      content = `
        <div class="image-container">
          <img src="${fileUrl}" style="max-width:100%;height:auto;">
          <div class="image-text"><span id="textMeasure">${textContent}</span></div>
        </div>`;
      
      // Set the content to the modal
      modalContentElement.innerHTML = content;

      // Dynamically break lines based on width
      const textMeasureElement = document.getElementById('textMeasure');
      if (textMeasureElement) {
        breakLinesToFitWidth(textMeasureElement, modalContentElement.clientWidth);
      }
    } else {
      // Handle text-based content
      content = await getData(fileUrl);
    }

    modalContentElement.innerHTML = content;
    document.getElementById('modal').style.display = 'block';
    modalContentElement.style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
    modalContentElement.innerText = 'Error: Unable to load the content.';
    document.getElementById('modal').style.display = 'block';
    modalContentElement.style.display = 'block';
  }
}

function breakLinesToFitWidth(textElement, maxWidth) {
    // Create a temporary element for measuring text width
    var measure = document.createElement("span");
    measure.style.visibility = "hidden"; // Hide the element
    measure.style.position = "absolute"; // Take it out of document flow
    measure.style.whiteSpace = "nowrap"; // Prevent line breaks
    document.body.appendChild(measure);

    const words = textElement.innerText.split(/\s+/); // Split by whitespace
    let line = '';
    let formattedText = '';

    words.forEach(word => {
        measure.innerText = line + word + ' '; // Set text for measurement

        if (measure.offsetWidth > maxWidth) {
            // If line exceeds maxWidth, start a new line
            formattedText += `<span style="background-color: black; padding: 0 4px; line-height: 2.6; display: inline-block;">${line.trim()}</span><br>`;
            line = '';
        }

        line += word + ' ';
    });

    if (line) {
        // Add the last line
        formattedText += `<span style="background-color: black; padding: 0 4px; line-height: 2.6; display: inline-block;">${line.trim()}</span>`;
    }

    textElement.innerHTML = formattedText; // Set the formatted text
    document.body.removeChild(measure); // Remove the temporary element
}


  // Close the modal when clicking outside the content area
  document.getElementById('modal').addEventListener('click', function (event) {
    if (event.target.id === 'modal') {
      this.style.display = 'none';
      modalContentElement.style.display = 'none'; // Hide the overlayContent
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval when modal is closed
      }
    }
  });

  // Move closeModal variable and event listener inside DOMContentLoaded
  var closeModal = document.getElementById('closeModal');
  closeModal.addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
    modalContentElement.style.display = 'none'; // Hide the overlayContent
    if (intervalId) {
      clearInterval(intervalId); // Clear the interval when modal is closed
    }
  });
});
