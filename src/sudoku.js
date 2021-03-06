import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Button , Modal, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';


class SaveModal extends Component {
    render() {
        return(
            <div className="modal">
                <Modal
                    show={this.props.show_save}
                    onHide={this.props.close}
                    container={this.props.container}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Save grid</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            controlId="formBasicText"
                        >
                            <ControlLabel>Give your grid a name</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
                </div>
        )
    }
}

export default class extends Component {

    constructor() {
        super();
        this.state = {data: this.empty(), show_save: false};
    }


    empty() {
        let data = [];
        for ( let i=0; i<81; i++ ) data.push(0)
        return data;
    }


    check(data) {
        let row = [];
        for(let i=0; i < 9; i++ ) {
            let d = data[i];
            if ( d !== 0 ) {
                if (row.indexOf(d) !== -1) {
                    return false;
                }
                else {
                    row.push(d);
                }
            }
        }
        return true;
    }

    select_square(data, index) {

        let d = [];

        let offset = 0;

        if ( index > 2 ) offset += 27;
        if ( index > 5 ) offset += 27;

        d.push( data[offset + ((index%3)*3) + 0]);
        d.push( data[offset + ((index%3)*3) + 1]);
        d.push( data[offset + ((index%3)*3) + 2]);

        d.push( data[offset + ((index%3)*3) + 9 + 0]);
        d.push( data[offset + ((index%3)*3) + 9 + 1]);
        d.push( data[offset + ((index%3)*3) + 9 + 2]);

        d.push( data[offset + ((index%3)*3) + 18 + 0]);
        d.push( data[offset + ((index%3)*3) + 18 + 1]);
        d.push( data[offset + ((index%3)*3) + 18 + 2]);
        return d;
    }

    select_row(data, index) {

        let d = [];
        for( let i=0; i < 9; i++ ) d.push(data[(9*index) + i])
        return d;
    }

    select_col(data, index) {
        let d = [];
        for( let i=0; i < 9; i++ ) d.push(data[(9*i) + index])
        return d;
    }

    check_grid( data ) {
        for(let i=0; i < 9; i++ ) {
            if ( ! (this.check( this.select_square(data,i)) && this.check( this.select_row(data,i)) && this.check( this.select_col(data,i) ) ) ) {
                return false;
            }
        }
        return true;
    }


    solve() {

        let data = [];

        for( let i=1; i<=81; i++ ) {

            let e = this.refs[`i_${i}`].value;
            if ( e === "" ) {
                data.push(0);
            }
            else {
                data.push( parseInt(e, 10));
            }
        }

        this.solver(data);
        this.setState( {data: data } );
    }

    solver(data) {

        if ( ! this.check_grid(data) ) return false;

        let index = data.indexOf( 0 );
        if ( index === -1 ) return true;

        for ( let i=1; i <=9; i++ ) {
            data[index] = i;
            if ( this.solver(data) ) {
                return true;
            }
            else {
                data[index] = 0;
            }
        }
        return false;
    }

    onChange(event, i) {

        let val = event.target.value;
        if (val !== "" && ! (/[0-9 ]/).test(val) ) return;
        let data  = this.state.data;
        data[parseInt( i - 1, 10)] = val;
        this.setState( {data} )
    }

    clear() {
        this.setState( {data: this.empty()} )
    }

    save() {
        this.setState( {show_save: true} )
    }

    render() {
        let data = this.state.data;
        let index = 0;
        let grid = data.map( (d) => {
            index += 1;
            let c = "";
            if ( (index >=1 && index <= 9) || (index >=28 && index <= 36) || (index >=55 && index <= 63)) c += " top"
            if ( (index >=19 && index <= 27) || (index >=46 && index <= 54) || (index >=73 && index <= 81)) c += " bottom";
            if ( index % 3 === 1 ) c += " left";
            if ( index % 3 === 0 ) c += " right";
            let i = index;
            return (
                <div className="sudoku_grid"  key={`i_${index}`}>
                    <input id={index} ref={`i_${index}`} className={c} type="text" value={d === 0 ? "" : d} maxLength={1} onChange={(e) => this.onChange(e, `${i}`)}/>
                    {index % 9 === 0 ? <br/> : null}
                </div>
            )
        });

        let close = () => this.setState({ show_save: false});

        return (
            <div>

                <SaveModal close={close} show_save={this.state.show_save} container={this}/>

                <h1>Sudoku Solver</h1>
                <div className="grid">
                    {grid}
                    <br/>
                    <Button id="solve" ref="solve" block bsSize="large" bsStyle="success" onClick={() => this.solve()}>Solve</Button><br/>
                    <Button block bsSize="large" onClick={() => this.clear()}>Clear</Button><br/>
                    <Button block bsSize="large" onClick={() => this.save()}>Save</Button>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }

}
