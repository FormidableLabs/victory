# Data
The raw dataset for a component.  Can be anything.

# Normalized data
An array of objects with `{ x, y }` coordinates.
This is derived from a combination of properties: 
- the `data` property
- the `x` and `y` properties, which pick the correct field from the data.  Defaults to `"x"` and `"y"`, can be a function
- the `sortKey` and `sortOrder` properties


# Domain
The min + max of each axis of the data.  

# Range
The min + max of the visible area

# Scale
A function that scales the axis; eg. linear, logarithmic, exponential
 
