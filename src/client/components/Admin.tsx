import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'

export interface AdminProps extends RouteComponentProps<{ id: string }> {

}

export interface AdminState {
    chirp: { user: string, text: string };

}

class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {
            chirp: {
                user: "",
                text: ""
            },

        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    async componentDidMount() {
        let id = this.props.match.params.id;
        try {
            let resChirp = await fetch(`/api/chirps${id}`);
            let chirp = await resChirp.json();
            this.setState({ chirp });

        } catch (err) {
            console.log(err);
        }
    }

    async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
        let id = this.props.match.params.id
        const data = {
            user: this.state.chirp.user,
            text: this.state.chirp.text
        };
        
        if (this.state.chirp.user && this.state.chirp.text) {
            try {
                await fetch(`/api/chirps/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                this.props.history.push('/')
            } catch (err) {
                console.log(err)
            }
        } else {
            alert('needs user and text')
        }

    };

    async handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        let id = this.props.match.params.id
        e.preventDefault();
        try {
            await fetch(`/api/chirps/${id}`, {
                method: "DELETE"
            });
            this.props.history.push('/')
        } catch (err) {
            console.log('did not delete')
        }   
       

    }

    handleOnChange(value: string) {
        this.state.chirp.text = value
    }

    render() {
        return (
            <>
                <div className="chirpInput card col-md-5 border p-3 mt-3">
                    <div className="card-body bg-peaCh ">
                        <form
                            className="form-group mb-0 p-3">
                            <label htmlFor="user">Name</label>
                            <h3>{this.state.chirp.user}</h3>
                            <label htmlFor="text">Text</label>
                            <input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(e.target.value)}
                                type="text" className="form-control" value={this.state.chirp.text}
                                placeholder={this.state.chirp.text} />
                            <div className="text-right pt-3">
                                <button className="btn btn-outline-light text-right"
                                    onClick={this.handleEdit}
                                >Edit</button>
                                <button className="btn btn-outline-light text-right"
                                    onClick={this.handleDelete}
                                >Delete</button>
                            </div>
                        </form>
                    </div>
                </div>

            </>
        );
    }
}

export default Admin;