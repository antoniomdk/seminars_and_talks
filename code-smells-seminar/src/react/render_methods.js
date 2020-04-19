class Tabs extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  setActiveTab(activeTab){
    this.setState({ activeTab });
  }

  renderTabs(){
    return (
      this.props.tabs.map(tab =>(
        <a onClick={e => this.setActiveTab(tab.id)}
           key={tab.id}
           className={this.state.activeTab == tab.id ? "active" : ""}
        >
          {tab.title}
        </a>
      ))
    )
  }

  render(){
    return (
      <div>
        <p>Choose an item</p>
        <p>Current id: {this.state.activeTab}</p>
        <nav>
          {this.renderTabs()}
        </nav>
      </div>
    )
  }
}
