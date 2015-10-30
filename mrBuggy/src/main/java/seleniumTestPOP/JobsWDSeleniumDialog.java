package seleniumTestPOP;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class JobsWDSeleniumDialog {
	
private WebDriver driver;
	
	public JobsWDSeleniumDialog (WebDriver driver){
		this.driver = driver;
	}
	
	public void clickSeniorTesterJob () {
		WebElement link = driver.findElement(By.xpath(".//*[@id='content']/section/div/section/ol/li[2]/article/header/h3/a"));
		link.click();
	}
	

}
