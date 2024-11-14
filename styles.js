window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);	   
   });
});

function showTheQuotes(count) {
   let html = "<ol>";
   for (let c = 1; c <= count; c++) {
      html += `<li>Quote ${c} - Source</li>`;
   }
   html += "</ol>";

   document.querySelector("#quotes").innerHTML = html
}

   async function fetchQuotes(topic, count) {   
      let url = `https://wp.zybooks.com/quotes.php/?topic=${topic}&count=${count}`;
      let response = await fetch(url);
      let quotesData = await response.json();

      
      if (Array.isArray(quotesData)) {
         let html = "<ol>";
         quotesData.forEach(quote => {
            html += `<li>${quote.quote} - Source</li>`;
         });
         html += "</ol>";
         document.querySelector("#quotes").innerHTML = html;
      } else {
         document.querySelector("#quotes").innerHTML = "No quotes available.";
      }
   
  showTheQuotes(count);
}