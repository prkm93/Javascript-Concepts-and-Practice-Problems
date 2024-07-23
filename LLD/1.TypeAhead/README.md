# TypeAhead/AutoComplete Searchbox (LLD)

Create a searchbox which suggests list as user types in any character (results populating via API)

## Acceptance Criteria

- suggestions should come up as user types in any character
- user should be able to navigate the items in list via keyboard and navigated item should be highlighted
- once user is navigated at last item in list, pressing keydown should again highlight the first item in list
- pressing enter on any item should select the item (and entered in searchbox)
- removing any character from searchbox should again show the suggestions
- implement debouncing also (limit API calls on each keystroke)
- should show a message "no items found" if no search results match

## Good to have

- typed character or word should be highlighted in suggestion
