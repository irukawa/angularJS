package com.teste.crudjpa.dao;

import com.teste.crudjpa.model.Cliente;
import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;

@Stateless
@LocalBean
public class ClienteDAO {

//    @PersistenceContext
//    private EntityManager em;
//    
//    @PersistenceUnit(unitName = "TesteJPAPU")
//    private EntityManagerFactory emf;
    
    private EntityManagerFactory emf;
    private EntityManager em;
    

    public EntityManager createEntityManager() {
        emf = Persistence.createEntityManagerFactory("TesteJPAPU");
        this.em =this.emf.createEntityManager();
        return this.em;        
    }
   
                
    public List<Cliente> listClientes() {
        this.em=(this.em == null)?this.createEntityManager():this.em;
        return  this.em.createNamedQuery("Cliente.listAll", Cliente.class).getResultList();
    }

    public Cliente getCliente(Long id) {
        this.em=(this.em == null)?this.createEntityManager():this.em;
        return this.em.find(Cliente.class, id);
    }

    public void saveOrUpdate(Cliente cliente) {
        this.em=(this.em == null)?this.createEntityManager():this.em;
        this.em.merge(cliente);
    }

    public void deleteCliente(Long id) {
        this.em=(this.em == null)?this.createEntityManager():this.em;
        Cliente cliente = this.em.find(Cliente.class, id);
        this.em.remove(cliente);
    }

}
