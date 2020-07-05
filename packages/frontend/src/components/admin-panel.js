import React from 'react';


const Admin = () => {
    return (
        <>
        <div>
        <div >
        <h3>Admin Panel</h3>
        </div>
        <div className="vista" >
        <h5>Numero Paginacion: </h5>
        <form>
            <input  type="text" /><button className="btn-submit1"><strong>Enviar</strong></button>
        </form>
        <div id="table1" >
            <h6 className="line" ><span><strong>Tabla</strong></span></h6>
                <table className="table table-bordered" style={{align: 'right'}}>
                    <thead className="thead-light" >
                        <tr>
                            <th scope="col" ></th>
                            <th scope="col" >Categorias</th>

                        </tr>
                    </thead>
                   
                </table>
            </div>
            </div>


        <form>
            <input  type="text" /><button className="btn-submit2"><strong>Enviar</strong></button>
        </form>
        </div>
        </>
    )
}

export default Admin;