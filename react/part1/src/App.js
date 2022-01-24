const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} age  {props.age}</p>
    </div>
  )
}


const App = () => {

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="george" age={10} />
      <Hello />
      <Hello />

    </div>
  )

}


export default App
