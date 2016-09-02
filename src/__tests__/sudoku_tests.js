import Sudoku from '../sudoku'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils';


describe( '<Sudoku/>', () => {

    it('renders without crashing', () => {
        const s = shallow(<Sudoku />);
        expect( s.contains( <h1>Sudoku Solver</h1>)).toEqual(true)
    });

    it( 'solves easy puzzles', () => {
        const dom = mount(<Sudoku />);

        setGrid( dom, [
            0,1,0,  3,0,4,  5,0,0,
            5,0,7,  0,1,0,  4,0,0,
            0,4,0,  0,7,0,  0,1,9,

            4,0,0,  7,0,2,  0,0,8,
            0,3,8,  0,0,0,  2,9,0,
            2,0,0,  6,0,8,  0,0,7,

            9,8,0,  0,2,0,  0,6,0,
            0,0,4,  0,8,0,  9,0,5,
            0,0,3,  9,0,6,  0,2,0
        ]);

        dom.find("#solve").simulate('click');

        expect(getGrid(dom)).toEqual( [
            8,1,9,  3,6,4,  5,7,2,
            5,6,7,  2,1,9,  4,8,3,
            3,4,2,  8,7,5,  6,1,9,

            4,9,6,  7,3,2,  1,5,8,
            7,3,8,  5,4,1,  2,9,6,
            2,5,1,  6,9,8,  3,4,7,

            9,8,5,  4,2,3,  7,6,1,
            6,2,4,  1,8,7,  9,3,5,
            1,7,3,  9,5,6,  8,2,4
        ])

    });

});

function getGrid(dom) {
    let grid = [];
    for ( let i=0; i < 81; i++ ) {
        grid.push(parseInt(dom.find(`#${i + 1}`).get(0).value));
    }
    return grid;
}


function setGrid( dom, grid ) {
    for ( let i=0; i < 81; i++ ) {
        dom.find(`#${i+1}`).simulate('change', {target: {value: grid[i]}});;
    }
}
