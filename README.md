# Reusable Components and Hooks Guide

This is to ensure all members of the group are able to understand what has been done already.

## Available Components

In the src/materialUI/components/reuseableComponents directory, you can see the available reusable components:



### `card component`

The standard card component of the project.\
### How to use?
***Example Usage:***

```
<CardHolder>
  {items.map((item) => (
    <CardComponent item={item} link={`/works/${item.id}?tab=dashboard`} />
  ))}
</CardHolder>
```
Props for card components:

| Props Keyword | Description | Type | Required |
|---------------|-------------|-----|-----------|
| ***item*** | object you want to render in the card | object | true |
| ***link*** | if you want redirect after clicking the card | string | false |
| ***onClick*** | makes the card component acts like a button | function | false |
| ***height*** | if you want to specify the height of the card| string | false |
| ***image*** | if you want image on the card | string | false |
| ***children*** | to customize what would be the contents of the card for example if you want to put button or any other components | component | false |

### `dialog component`

Launches a pop up modal.
### How to use?
***Example Usage:***

```
<DialogComponent
  button={<Button variant='contained'>Join Classroom</Button>}
  title='Join Classroom'
  context='Collaborate with your classmates and discover something!'
  action={{ label: 'Join', handler: handleSubmit }}
  >
    <TextField
      id='standard-search'
      label='Code'
      variant='standard'
      name='sectionCode'
      value={sectionCode}
      onChange={(e) => onChange(e)}
      sx={{
        width: '520px',
        marginBottom: '3px',
        marginTop: '15px',
        marginLeft: '15px',
        padding: '2px',
        fontWeight: 'bold',
      }}
    />
</DialogComponent>
```

Props for dialog components:

| Props Keyword | Description | Type | Required |
|---------------|-------------|-----|-----------|
| ***title*** | The title that you see above on the upper part of the modal | string | false |
| ***context*** | A subtitle below the title | string | false |
| ***action*** | compose of label and the handler. This describe the button ok of the dialog | object | false |
| ***height*** | if you want to specify the height of the card| string | false |
| ***maxWidth*** | specify maxWidth ("lg", "md", etc.) | string | false |
| ***children*** | to customize what would be the contents inside the dialog for example if you want to put button or any other components | component | false |



## Available Hooks

### `useFetch`

Uses the fetched data and updates the component state for you. It requires object or array of object and return an object which compose of an object,***items*** and a function, ***setItems***
### How to use?
***Example Usage:***

```
useEffect(() => {
  dispatch(getClassroom()); # dispatch an action in the backend
}, []);
const { classes } = useSelector((state) => state.class); # get data from redux
const { items: classrooms, setItems: setClassrooms } = useFetch(classes); # using useFetch hook
```
> Note: Assign alias name for the returned ***items*** and ***setItems*** to avoid confusion and improve code readablity

