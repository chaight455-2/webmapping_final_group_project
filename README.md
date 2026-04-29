Visit the site at: https://chaight455-2.github.io/UW-Madison-Amenities/

# University of Wisconsin Madison Amenities Map

### Team Members
Nolan Hegge, Charlie Haight, Aidan Schooff

### Final Proposal

We are proposing to create an interactive map that allows a user to see the amenities that are available to them in academic buildings on campus. These include microwaves, refrigerators, vending machines, public computers, and printers/copy machines.

TODO:
1. Persona/Scenario
    1. Persona:
Our user persona is a hypothetical UW-Madison student named Bob Johnson. Bob is a freshman that just started his first Semester at UW Madison and is settling into living on a new campus. After a week of classes, Bob now knows where all of his lectures are. However, he doesn't know where many of the other academic buildings are or what amenities are inside of them. Some examples of these amenities are microwaves, refrigerators, vending machines, public computers, and printers/copy machines. Bob has found this especially difficult since he only has a limited amount of time between his classes and would like to be able to access certain amenities (such as a microwave or printer) between them. Because of this, we are creating a mobile-first tool that can help Bob (and other students like him) to help better understand and navigate to the amenities that they have on campus. This application is especially useful since there is not currently an existing map or application for the UW-Madison campus that lets students look at campus amenities in a holistic and timely manner.
    2. Scenario:
Our scenario revolves around our hypothetical UW-Madison student Bob. Bob has just finished his class at Van Hise and wants to heat up his lunch in a microwave on campus and print some notes before his afternoon classes start. Additionally, if Bob doesn't finish his lunch, he would like to put it in a refrigerator so it doesn't go bad. However, Bob is a freshman on campus and doesn't know where a refrigerator, microwave, or printer are in nearby academic buildings. Because of this, Bob will open up our application page on his phone, which has a mobile-first design. The main screen of the app will be a map page which will show his current location via the browser's geolocation API and the academic buildings around him. Bob can then filter by microwave, refrigerator, and printer for all the buildings nearest to him that contain those amenities, displayed as color-coded icons on the buildings. Buildings that are currently closed appear with a red visual indicator, so Bob can immediately tell which ones are available. He can then receive more information about the amenities by clicking a building to see its full info and hours, and then clicking an amenity within the popup to see its specific location inside the building. Bob then can use all this information gained from our application and decide to go to Mosse Hall to heat up his lunch and print his notes. Overall, this application can help guide Bob and other new students to save time, learn about their campus, and prevent unnecessary stress while adjusting to the UW-Madison campus.
2. Requirements Document
   1. Interactions and Representations
        1. **Filter** - Users will be able to filter the map based on their amenity of interest, whether it be microwaves, refrigerators, vending machines, public computers, or printers/copy machines. This will be represented in the web map with a panel that has checkboxes next to each amenity of interest. The filter’s result will show color-coded icons on each academic building representing the amenities it contains. Only the selected/filtered amenities will be displayed on the map.
        2. **Retrieve** - Users will be able to click on any building polygon on the map. Upon clicking a building, a popup window will show full building information including the building’s hours and the amenities it contains. Users can then click on an individual amenity within the popup to see detail on its specific location within the building (e.g., floor number) and any access restrictions.
        3. **Building Hours Styling** - Buildings that are currently closed will appear with a red visual indicator (or similar styling) based on the current time and the building’s hours data. This allows users to immediately identify which buildings are open and available without needing to click on each one.
        4. **Geolocation** - The user’s current location will be displayed on the map using the browser’s geolocation API. This allows users to orient themselves and identify nearby buildings containing the amenities they need.
        5. **Search** - The users will be able to search for a building on campus in a small search bar near the top of the page. Upon searching, the map will zoom into the building of interest, showing each amenity icon inside that is overlaid using the filter tool.
        6. **Zoom and Pan** - Users will have free zooming and panning capabilities down to the level of inside a small building, and up to the level of campus in its entirety

    2. Required Data
        1. Campus Building GeoJSON (Madison Open Data portal) — academic buildings only
        2. Base Layer (Open Street Maps)
        3. Team Collected Data (amenities stored as attributes of buildings — microwaves, refrigerators, vending machines, public computers, printers/copy machines)
        4. Building Hours Data (manually collected by team)


3. Wireframes:

The wireframes pictured below help show off some of the core functionality and operators of the campus amenities map that our group plans to create. Comments on map functionality/design choices are circled with arrows pointing to the design choices.

Wireframe showing primary functionality such as filter, search, zoom/pan, geolocation, and retrieve: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/PrimaryMap.jpg "Primary Map")

Wireframe showing the resymbolize feature using the point/amenity selection to find buildings containing the amenity nearest to the selected starting point: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/ResymbolizeMap.jpg "Resymbolize Map")

Wireframe showing building hours styling where closed buildings appear red and open buildings are accessible: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/TimeSequenceMap.jpg "Building Hours Map")

 
