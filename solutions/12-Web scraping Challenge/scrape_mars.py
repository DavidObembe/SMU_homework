from bs4 import BeautifulSoup
from splinter import Browser
import json
import pandas as pd
from datetime import datetime



def scrapify():
    #splinter added

    executable_path = {'executable_path':r"C:\Program Files\chromedriver.exe"}
    browser = Browser('chrome', **executable_path)
    URL= 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
    
    browser.visit(URL)
    html= browser.html
    soup = BeautifulSoup(html, 'html.parser')
    news_titles = soup.find_all(class_= "content_title")
    
    latest_news=[]

    for news in news_titles:
        if news.a:
            latest_news.append(news)
    
    news_title= latest_news[0].text.strip()
    
    news_website= 'https://mars.nasa.gov'+ latest_news[0].a['href']
    
    
    #JPL Mars Space Images - Featured Image
    spaceImage_url='https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(spaceImage_url)
    space_html= browser.html
    spaceImg_soup = BeautifulSoup(space_html, 'lxml')
    
    image = spaceImg_soup.find_all(class_="carousel_item")
    image_link= image[0]['style'].split("'")
    featured_image_url = 'https://www.jpl.nasa.gov/'+ image_link[1]

    
    #mars weather
    MarsTwitter_url= 'https://twitter.com/marswxreport?lang=en'
    browser.visit(MarsTwitter_url)
    marsTwitter_html = browser.html
    marsTwitter_soup = BeautifulSoup(marsTwitter_html, 'lxml')
    tweet_texts = marsTwitter_soup.find_all('span', class_="css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0")
    mars_weather=" "
    
    for tweet in tweet_texts:
        if "InSight sol" in tweet.text:
            mars_weather = tweet.text
            break
            
    #Mars Facts
    marsFacts_url = 'https://space-facts.com/mars/'
    browser.visit(marsFacts_url)
    marsFacts_html= browser.html
    #marsFacts_soup= BeautifulSoup(marsFacts_html, 'lxml')
    mars_df= pd.read_html(marsFacts_html)
    first_mars_table= mars_df[0]
    first_mars_table.columns = ["Measurement", "Value"]

    data_html = first_mars_table.to_html(index=False)
    data_html = data_html.replace('class="dataframe"', 'class="table table-hover"')
    data_stats= json.loads(first_mars_table.to_json(orient="records"))
    
    #Mars Hemispheres
    hemisphere_url= 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(hemisphere_url)
    hemisphere_html= browser.html
    hemisphere_soup = BeautifulSoup(hemisphere_html, 'lxml')
    
    
    hemisphere_imgs= hemisphere_soup.find_all('a', 'img alt', class_="itemLink product-item")
    hemisphere_dictionary= []
    
    src_url= []
    
    img_url= []
    sub_string_url= 'https://astrogeology.usgs.gov/'

    for imgs in hemisphere_imgs:
        i_url= 'https://astrogeology.usgs.gov/' +imgs['href']
        if i_url not in img_url:
            img_url.append(i_url)

            browser.visit(i_url)
            full_img_html= browser.html
            full_img_soup= BeautifulSoup(full_img_html, 'lxml')

            src_details=  full_img_soup.find( 'img', 'src', class_="wide-image")
            src_details = sub_string_url + src_details['src']
            src_url.append(src_details)
            title= full_img_soup.find('h2', class_='title').text
            imageDictionary = {'img_url':src_details, 'title': title}
            hemisphere_dictionary.append(imageDictionary)

    browser.quit()
    
    results_dictionary = {
        "news_title": news_title,
        "news_website": news_website,
        "Mars_Featured_image": featured_image_url,
        "latest_Mars_tweet": mars_weather,
        "data_html": data_html,
        "data_stats":data_stats,
        "Hemisphere_image_urls": hemisphere_dictionary,
        "active":1,
        "date_scraped": datetime.now()
        }
    
    return results_dictionary


if __name__ == "__main__":

    # If running as script, print scraped data
    print(scrapify())



