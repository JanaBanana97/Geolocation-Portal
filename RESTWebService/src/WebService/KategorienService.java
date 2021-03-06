package WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.*;

@Path("KategorienService")
public class KategorienService {
	
	Connection connection;
	Statement statement;
	
	public KategorienService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();
	}
		
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllKategorien")
	public Response getAllKategorien() {
		System.out.println("KategorienService.getAllKategorien... called.");
		List<Kategorien> returnList = new ArrayList<Kategorien>();
		try {
			ResultSet resultSet = statement.executeQuery("SELECT * FROM Kategorien");
			
			while(resultSet.next()){
				Kategorien k = new Kategorien();
				k.kategorienId = resultSet.getInt("kategorienId");
				k.bezeichnung = resultSet.getString("bezeichnung");
				returnList.add(k);
			}
		}
		catch(Exception e){
			System.out.println();
			returnList = null;
		}
		GenericEntity<List<Kategorien>> myEntity = new GenericEntity<List<Kategorien>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}
}
