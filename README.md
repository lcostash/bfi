# BFI Software developer technical task

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3.

## Run the project locally 

1. Be sure you have installed [Node.js](https://nodejs.org/en/);
2. Clone the project on local machine in folder `bfi`;
3. Go inside of `bfi` folder and run `npm install`;
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Prepare the project for production

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Live example of the project

The live example of this project can be founded [here](https://bfi.mycashbag.org). The project will be hosted there until 28/02/2022.

## Detail on the available content API endpoints

Full article listing:
* https://content-store.explore.bfi.digital/api/articles

This can be paged thus:
* https://content-store.explore.bfi.digital/api/articles?page=2

You can also specify the number of results per page, for example:
* https://content-store.explore.bfi.digital/api/articles?page=1&size=10

You can filter based on author or article type:
* https://content-store.explore.bfi.digital/api/articles?author={author-id}
* https://content-store.explore.bfi.digital/api/articles?type={review-id}

Examples of this:
* https://content-store.explore.bfi.digital/api/articles?author=26a4d401-c374-590f-9150-999e19e53da7
* https://content-store.explore.bfi.digital/api/articles?type=reviews

You can find a list of all available types and authors along with corresponding id here:
* https://content-store.explore.bfi.digital/api/types
* https://content-store.explore.bfi.digital/api/authors
