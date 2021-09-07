# A simple game of Zilch

## version 1
- Game play testing in node using prompt sync for play interaction
- While loop for player round
- Roll set randomised set of 6 numerals (dice)
- Roll length adjusted each time a dice is taken as a score
- Checking for valid choices
- Score tracking and total when turn ends


## version 2
- Adding play turns and turn total tracking



pseudo:

    is str lng 1? YES - look up score
    |
    NO
    |
    is str lng 3? YES are values all the same?
        |                     |            |
        |                    YES           NO
        NO           look up score    split on each and look up
    are all the same?
        |        |
    YES       |
    split on third value and look up then * score by two for each remaining value
                |
                NO
                is 123456?
                is 
