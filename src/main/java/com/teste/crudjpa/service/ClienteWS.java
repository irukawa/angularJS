package com.teste.crudjpa.service;

import com.teste.crudjpa.dao.ClienteDAO;
import com.teste.crudjpa.model.Cliente;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/clientes")
@Produces({"application/json", "application/json"})
public class ClienteWS {

    @EJB
    private ClienteDAO clienteDao;
    
    @GET    
    public List<Cliente> list(){
        return clienteDao.listClientes();
    }

    @GET
    @Path("/{id}")
    public Cliente get(@PathParam("id") Long id) {
        return clienteDao.getCliente(id);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void save(Cliente cliente){        
        clienteDao.saveOrUpdate(cliente);
    }        

    
    @Path("/{id}")
    @DELETE
    public void delete(@PathParam("id") Long id){
        clienteDao.deleteCliente(id);
    }
        
}
