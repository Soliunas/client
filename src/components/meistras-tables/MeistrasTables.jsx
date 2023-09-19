import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function MeistrasTypesTable() {
  const { meistrasTypes, deleteMeistrasType } = useContext(GlobalContext);

  /*
GET: http/api/example-types                                                         ['type1', 'type2', 'type3']
GET: http/api/example-types/pavadinimas                                             {title: type1, size: 5, color: red}
DELETE: http/api/example-types/pavadinimas
POST: http/api/example-types + {title: type1, size: 5, color: red}
PUT:  http/api/example-types/pavadinimas + {title: type1, size: 5, color: red}
*/

  function deleteMeistrasTypeHandler(title) {
    fetch("http://localhost:3001/api/meistras-types/" + title, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          deleteMeistrasType(title);
        }
      })
      .catch(console.error)
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Darbo tipas</th>
            <th className="text-end" scope="col">
              Veiksmas
            </th>
          </tr>
        </thead>
        <tbody>
          {meistrasTypes.map((meistrasType, index) => (
            <tr key={meistrasType}>
              <td>{index + 1}</td>
              <td>{meistrasType}</td>
              <td className="d-flex gap-2 justify-content-end">
                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/meistras-types/${meistrasType}/edit`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMeistrasTypeHandler(meistrasType)}
                  className="btn btn-danger btn-sm"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}