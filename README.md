# University of Wisconsin Madison Utilities Map

### Team Members
Nolan Hegge, Charlie Haight, Aidan Schooff

### Final Proposal

We are proposing to create an interactive map that allows a user to see the utilities that are available to them on campus. These include, but are not limited to, microwaves, study spaces, fridges, etc.

TODO:
1. Persona/Scenario
    1. Persona:
Our user persona is a hypothetical UW-Madison student named Bob. Bob is a freshman that just started his first Semester at UW Madison and is settling into living on a new campus. After a week of classes, Bob now knows where all of his lectures are. However, he doesn't know where many of the other campus buildings are or what utilities are inside of them. Some examples of these utilities are campus study spaces, refrigerators, microwaves, vending machines, and individual/gender neutral bathrooms. Bob has found this especially difficult since he only has a limited amount of time between his classes and would like to be able to access certain utilities (such as a microwave or bathroom) between his classes.
    2. Scenario:
Our scenario revolves around our hypothetical UW-Madison student Bob. Bob has just finished his class at Van Hise and wants to heat up his lunch in a microwave on campus and study for a while before his afternoon classes start. Additionally, if Bob doesn't finish his lunch, he would like to put it in a refrigerator so it doesn't go bad. However, Bob is a freshman on campus and doesn't know where many of the study spots are or where a refrigerator and microwave are. Because of this, Bob will open up our application page on his phone, which has flexible css styling to be mobile friendly. The main screen of the app will be a map page which will show the buildings that are close to Bob's chosen location. Bob can then filter by microwave, refrigerator, and study location for all the buildings nearest to him that contain those utilities. He can also decide to resymbolize the map to only highlight buildings with the utilities he is searching for. He can then adjust the time of the day on the application to make sure the building will be open during the time he plans on visiting there. Finally, he can receive more information about the utilities by clicking the utility icon to see its location in the building and by clicking the building itself to see the hours of the building and the number of utilities that it contains. Bob then can use all this information gained from our application and decide to go to Mordige Hall to study and heat up his lunch. Overall, this application can help guide Bob and other new students to save time, learn about their campus, and prevent unnecessary stress while adjusting to the UW-Madison campus.
2. Requirements Document
   1. Interactions and Representations
        1. **Filter** - Users will be able to filter the map based on their utility of interest, whether it be microwaves, refrigerators, study spaces, or bathrooms. This will be represented in the web map with a panel that has checkboxes next to each utility of interest, allowing users to overlay different layers of utilities on top of each building on campus. The filter’s result will show points on the map inside of each building polygon representing the individual utilities. These points can then be interacted with using the retrieve interaction.
        2. **Retrieve** - Users will be able to click on any individual utility point within a building and the building polygons themselves. Upon clicking an individual utility point, an information popup window will show information such as the floor it is on, what building it is inside, and which students may have special/restricted access to it. Upon clicking on any building polygon, a popup window will show information about the building’s hours and the count of each utility type within it.
        3. **Resymbolize Attributes** - Users will be able to resymbolize the map’s colors based on each building polygon’s distance to a point specified by the user. Upon use of this tool, embedded in a side panel of the web map, the user will be prompted to select a point on the map and a utility of interest. The map will then resymbolize: The building polygons that are closest to the user’s selected point and also contain the utility of interest will be shaded in darker colors, and the building polygons containing the utility that are further away from the selected point will be lighter colors. Buildings that do not contain the selected utility will be greyed out or not colored. This allows the user to identify the closest utility of interest to their location and any other possible options in case a building or floor has a special access key or restricted hours, which can be viewed with the retrieve click.
        4. **Sequence** - Users will be able to sequence through the hours of the day or the days of the week, which will then filter the map by time. Only the buildings that are open during the specified time or day of the week will be shown on the map, the others will be greyed out or not highlighted. This sequence operator will be embedded in a side panel of the map, and will be a small interface widget with forward and backward arrows. The timestamps for the time of day and week will be shown in sliders near the bottom of the map. 
        5. **Search** -  The users will be able to search for a building on campus in a small search bar near the top of the page. Upon searching, the map will zoom into the building of interest, showing each utility point inside that is overlaid using the filter tool. 
        6. **Zoom and Pan** - Users will have free zooming and panning capabilities down to the level of inside a small building, and up to the level of campus in its entirety

    2. Required Data
        1. Campus Boundaries (Madison Open Data portal)
        2. Campus Building GeoJSON (Madison Open Data portal)
        3. Base Layer (Open Street Maps)
        4. Team Collected Data (Finding the locations of microwaves, fridges, other utilities)
        5. Campus Building Hours Data (UW-Madison Facilities Website)


3. Wireframes:

The wireframes pictured below help show off some of the core functionality and operators of the campus utility map that our group plans to create.

Wireframe showing primary functionality such as filter, search, zoom/pan, and retreive, : 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/PrimaryMap.jpg "Primary Map")

Wireframe showing the resymbolize feature using the point/utility selection to find buildings containing the utility nearset to the selected starting point: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/ResymbolizeMap.jpg "Resymbolize Map")

Wireframe showing the sequence feature which allows users to select the day and time to see open buildings: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/TimeSequenceMap.jpg "Time Map")

 
