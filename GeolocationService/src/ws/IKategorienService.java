package ws;

import java.util.*;

import javax.jws.WebMethod;
import javax.jws.WebService;
import entities.Kategorien;

@WebService
public interface IKategorienService {

	@WebMethod
	public List<Kategorien> getKategorien();	
}
