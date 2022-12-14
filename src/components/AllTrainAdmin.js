import React, {Component} from "react";
/* import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";  */
import alltrainService from "../services/alltrainService";
import "../App.css";

class AllTrainAdmin extends Component{
    constructor(props){
        super(props)
        this.state={
            searches: [],
            searchValue:''
        }
        this.addSearch=this.addSearch.bind(this);
        this.deleteSearch=this.deleteSearch.bind(this);
        this.updateSearch=this.updateSearch.bind(this);
        this.searchTrain=this.searchTrain.bind(this);
    }

    componentDidMount(){
        alltrainService.getSearches().then((res)=>{
            this.setState({searches: res.data});
              
        });
    }
    deleteSearch(id){
        alltrainService.deleteSearch(id).then(res => {
            this.setState({searches: this.state.searches.filter(Search=> Search.id !==id)});
        });
    }

    addSearch(){
        this.props.history.push('/add-train');
    }

    updateSearch(data){
        this.props.history.push('/update-train', data);
    }

    searchTrain(e) {
        const value = e.target.value
        const _value = value.toUpperCase()
        const filterData = this.state.searches.filter(item => {
            let res
            for (const key in item) {
                const convertInString = `${item[key]}`.toUpperCase()
                if (convertInString.includes(_value)) {
                    res = true
                }
            }
            return res
        })

        if (value !== '') {
            this.setState({
                searchValue: value,
                searches: filterData
            })
        }
        else {
            this.setState({
                searchValue: value,
            })
            alltrainService.getSearches().then((res)=>{
                this.setState({searches: res.data});
                  
            });
        }
    }
    
    

    render(){
        return(
            <div >
            <div className="alltrain">
                <h2 className="text-center">All Trains</h2>
                
                <button className="btn btn-primary" onClick={this.addSearch}> Add Train</button>
                <br/>
                <input onChange={this.searchTrain} value={this.state.searchValue}/>
               
                <br/>
                <div className="row12">
                    <table className="table table-striped table-bordered" >
                        <thead>
                            <tr style={{textAlign:"center"}}>
                                <th>id</th>
                                <th>Train Number</th>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Train Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.searches.map(
                                    search=>
                                    <tr style={{textAlign:"center"}} key={search.id}>
                                        <td>{search.id}</td>
                                        <td>{search.trainNumber}</td>
                                        <td>{search.origin}</td>
                                        <td>{search.destination}</td>
                                        <td>{search.trainDate}</td>
                                        <td>
                                        <button  className="btn btn-info" style={{backgroundColor:"goldenrod"}} onClick={()=>this.updateSearch(search)}>Update </button>
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSearch(search.id)} className="btn btn-danger">Delete </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>  
            </div>
            </div>
        )
    }
}

export default AllTrainAdmin;
