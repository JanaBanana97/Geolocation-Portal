package ws;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import entities.Kategorien;

@WebService(endpointInterface = "ws.IKategorienService")
public class KategorienService implements IKategorienService {

	public Connection connection;
	public Statement statement;
	public ResultSet resultSet;
	
	
	
	@Override
	public List<Kategorien> getKategorien() {
		List<Kategorien> returnList;
		
		try {
			
			//registrieren
			Class.forName("com.mysql.jdbc.Driver"); 
			
			//verbinden
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/GeoLocationProject?serverTimezone=UTC", "root", "");
			statement = connection.createStatement();
			resultSet = statement.executeQuery("select * from kategorien");
			
			returnList = new ArrayList<Kategorien>();
			while(resultSet.next()) {
				Kategorien k = new Kategorien();
				k.setKategorienId(resultSet.getInt("kategorienId"));
				k.setBezeichnung(resultSet.getString("bezeichnung"));
				returnList.add(k);
			}
		}
		catch(Exception e) {
			return null;
		}
		return returnList;
	}
}
