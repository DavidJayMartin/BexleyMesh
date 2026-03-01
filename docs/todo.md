[ ] Task 1.0 - Update the the repeater status script to improve the capture of traffic and identify when a repeater is online.  The new process should follow these steps:
  1. Use the existing process of identifying records with payload_type=="Advert" and decoded_payload.mode=="Repeater" to identify what repeaters have been observed.  
  2. Using the decoded_payload.public_key as the identifer from the repeaters, run through all the records again to identify any any records that have decode_payload.public_key that match any of the repeater public keys or matches using the first two characters of the decoded_payload.public_key and looking for those characters to be included in the path value.  A match for either of these tests indicate that the repeater was active in the transmission.
  3. Use the heard_at timestamp to identify the last time each repeater was heard.

[ ] Task 1.1 - Add another process to the repeater status script to calculate the average snr value for each repeater
[ ] Task 1.2 - Add another process to the repeater status script that calculate the average rssi value for each repeater
[ ] Task 1.3 - Add another process to the repeater status script that count the number of unique Companion nodes that were active in the last 30 days using decoded_payload.mode=="Companion"
[ ] Task 1.4 - Connect Network status at top of home page to status of the repeaters.  Using the percentage of total repeaters identified, display "ONLINE" if > 75% are active, display "REDUCED COVERAGE" if 25-75% are active, display "LIMITED COVERAGE" if < 25% are active, display "OFFLINE" if 0% are active.  Set the node-pulse element to rgb(34, 197, 94) if the status is ONLINE, rgb(248 255 43) if the status is REDUCED COVERAGE, rgb(255 152 43) if the status is LIMITED COVERAGE, and rgb(255, 0, 0) if the status is OFFLINE.
[ ] Task 1.5 - Replace the metrics in the Live Stats section with the following:  
  - Total Nodes = total number of repeaters
  - Average Signal Strength
  - Count of unique companions on the network on the past 30 days

[ ] Task 2.0 - Create reusable code blocks for the Navigation, Resource Links, and Footer sections.  Update the index.html, blog.html, and post.html pages to use the reusable blocks.  **DONE** - Created js/components.js with renderNavigation(), renderResources(), renderFooter(). All pages updated.

[ ] Task 3.0 - Create a template for non-blog post pages  **DONE** - Created page.html that loads markdown from docs/ folder.
[ ] Task 3.1 - Update the getting-started.md file to use the new page template. Link the  Getting Started button in the hero section on the home page to the Getting Started page.  **DONE** - Hero button links to page.html?page=getting-started
[ ] Task 3.2 - Create an About Us page  **DONE** - Created docs/about.md
[ ] Task 3.3 - Remove the Central Ohio Mesh and Meshcore links from the Navigation and add them to the to the Resources panel  **DONE**
[ ] Task 3.3 - Add links to the Gettings Started and About Us pages to the Navigation  **DONE**

[ ] Task 4.0 - Rewrite the "What is this project? blub and give the text higher contrast  **DONE** - Expanded blurb with two paragraphs, changed text classes to text-slate-100/text-slate-200

[ ] Task 5.0 - Move Join Discord button to the hamburger menu when the  screen width is < 1024 pixels  **DONE** - Discord button hidden below lg, added to mobile menu. Hamburger visible on all sub-lg screens.

[ ] Task 6.0 - Set width of the Main Center section in the post.html to match the width of all the other content  **DONE** - Changed max-w-4xl to max-w-7xl
