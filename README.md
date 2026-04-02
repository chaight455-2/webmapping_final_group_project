# Team Name

### Team Members
Nolan Hegge, Charlie Haight, Aidan Schooff

### Final Proposal

We are proposing to create an interactive map that allows a user to see the utilities that are available to them on campus. These include, but are not limited to, microwaves, study spaces, fridges, etc.

TODO:
1. Persona/Scenario
    1. Persona
    2. Scenario
2. Requirements Document
   1. Interactions and Representations
        1. **Filter** - Users will be able to filter the map based on their utility of interest, whether it be microwaves, refrigerators, study spaces, or bathrooms. This will be represented in the web map with a panel that has checkboxes next to each utility of interest, allowing users to overlay different layers of utilities on top of each building on campus. The filter’s result will show points on the map inside of each building polygon representing the individual utilities. These points can then be interacted with using the retrieve interaction.
        2. **Retrieve** - Users will be able to click on any individual utility point within a building and the building polygons themselves. Upon clicking an individual utility point, an information popup window will show information such as the floor it is on, what building it is inside, and which students may have special/restricted access to it. Upon clicking on any building polygon, a popup window will show information about the building’s hours and the count of each utility type within it.
        3. **Resymbolize Attributes** - Users will be able to resymbolize the map’s colors based on each building polygon’s distance to a point specified by the user. Upon use of this tool, embedded in a side panel of the web map, the user will be prompted to select a point on the map and a utility of interest. The map will then resymbolize: The building polygons that are closest to the user’s selected point and also contain the utility of interest will be shaded in darker colors, and the building polygons containing the utility that are further away from the selected point will be lighter colors. Buildings that do not contain the selected utility will be greyed out or not colored. This allows the user to identify the closest utility of interest to their location and any other possible options in case a building or floor has a special access key or restricted hours, which can be viewed with the retrieve click.
        4. **Sequence** - Users will be able to sequence through the hours of the day or the days of the week, which will then filter the map by time. Only the buildings that are open during the specified time or day of the week will be shown on the map, the others will be greyed out or not highlighted. This sequence operator will be embedded in a side panel of the map, and will be a small interface widget with forward and backward arrows. The timestamps for the time of day and week will be shown in sliders near the bottom of the map. 
        5. **Search** -  The users will be able to search for a building on campus in a small search bar near the top of the page. Upon searching, the map will zoom into the building of interest, showing each utility point inside that is overlaid using the filter tool. 
        6. **Zoom and Pan** - Users will have free zooming and panning capabilities down to the level of inside a small building, and up to the level of campus in its entirety

    2. Required Data
        1. Madison Open Data portal?
        2. Team Collected Data - Finding the locations of microwaves, fridges, other utilities
        3. Campus Building Hours Data


3. Wireframes
Wireframe showing primary functionality such as filter, search, zoom/pan, and retreive, : 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/PrimaryMap.jpg "Primary Map")

Wireframe showing the resymbolize feature using the point/utility selection to find buildings containing the utility nearset to the selected starting point: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/ResymbolizeMap.jpg "Resymbolize Map")

Wireframe showing the sequence feature which allows users to select the day and time to see open buildings: 
![alt text](https://github.com/chaight455-2/webmapping_final_group_project/blob/project-proposal/img/TimeSequenceMap.jpg "Time Map")

