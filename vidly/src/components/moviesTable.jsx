import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from "./common/like";
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import Table from './common/table';
import auth from '../services/authService';

const x = <Like></Like>;

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: 'genre.name', label: 'Genre' }, // content: movie => <Link to={`/movies/${movie.title}`}>{movie.numberInStock}</Link> },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like', content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} /> },
  ];
  
  deleteColumn = { key: 'delete', content: movie => (<button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button> )}

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin)
      this.columns.push(this.deleteColumn)
  }

  render() { 
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

    return (
      <Table 
        columns={this.columns} 
        data={movies} 
        sortColumn={sortColumn} 
        onSort={onSort} 
      />
      // <table className="table">
      //   <TableHeader 
      //     columns={this.columns} 
      //     sortColumn={sortColumn}
      //     onSort={onSort}
      //   />
      //   <TableBody 
      //     data={movies} 
      //     columns={this.columns}
      //   />
        /* <tbody> 
          { movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like 
                liked={movie.liked}
                onClick={() => onLike(movie)}
              />
            </td>
            <td>
              <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          ))}
        </tbody> */
      // </table>
    );
  }
}
 
export default MoviesTable;