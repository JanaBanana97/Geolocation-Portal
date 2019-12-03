package ws;

public class IKategorienServiceProxy implements ws.IKategorienService {
  private String _endpoint = null;
  private ws.IKategorienService iKategorienService = null;
  
  public IKategorienServiceProxy() {
    _initIKategorienServiceProxy();
  }
  
  public IKategorienServiceProxy(String endpoint) {
    _endpoint = endpoint;
    _initIKategorienServiceProxy();
  }
  
  private void _initIKategorienServiceProxy() {
    try {
      iKategorienService = (new ws.KategorienServiceServiceLocator()).getKategorienServicePort();
      if (iKategorienService != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)iKategorienService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)iKategorienService)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (iKategorienService != null)
      ((javax.xml.rpc.Stub)iKategorienService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public ws.IKategorienService getIKategorienService() {
    if (iKategorienService == null)
      _initIKategorienServiceProxy();
    return iKategorienService;
  }
  
  public ws.Kategorien[] getKategorien() throws java.rmi.RemoteException{
    if (iKategorienService == null)
      _initIKategorienServiceProxy();
    return iKategorienService.getKategorien();
  }
  
  
}