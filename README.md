# Custom Cake Matching Project

## Project Scope
The goal of this project is to match users with customized cake flavors based on their personal preferences or fortune-telling information. A preview image of the cake will be generated to help users place an order. The project will deliver three main interfaces: a user input interface, a cake generation interface, and an order information interface.

## Target Users
- Young consumers  
- Flavor-conscious individuals

## Key Features

### For Consumers (To C)
1. **Home Page**: Fortune-telling entry, product cards (image, name, price, ingredients), and filtering options (price range, main fruit, shape)  
2. **User Input Interface**: Quiz-based fortune-telling form to collect preferences  
3. **Loading Interface**: Displaying cake generation progress with a magical, tarot-inspired visual  
4. **Product Interface**: Shows the generated cake along with visual and descriptive information  
5. **Order Interface**: Allows users to adjust allergens, add special notes, and confirm their order  

## Project Timeline
- Week 1: Requirement gathering and initial user research  
- Week 2: Wireframing and information architecture  
- Week 3: Visual design and interaction flow  
- Week 4: Implementation of core interfaces  
- Week 5: Testing and iteration

## Contact
Shangming Zhuo
Client
Email: oiviauw@uw.edu
Yunqing Zhao
Developer
Email: yzhao73@uw.edu



##  Virtual Environment Setup

To run the app locally, first create and activate a Python virtual environment:


python3 -m venv venv
source venv/bin/activate

##  Project Structure
cakeke/
├── pages/                ← Multi-page support (customer interfaces)
│   ├── customer.py       ← Customer-side page
├── assets/               ← Static resources (images, GIFs, logos)
├── logic/                ← Core logic (recommendation algorithm, inventory handling)
│   ├── rules.py          ← Logic for generating cake recommendations
│   └── data.json         ← Simulated inventory and order data
├── requirements.txt
├── README.md
└── venv/                 ← Python virtual environment folder


## Weekly Progress –  04/18

This week, the following milestones were achieved:

-  Set up a working Python virtual environment with `venv` and recorded dependencies in `requirements.txt`
-  Designed and confirmed the customer-side information architecture with client input
-  Created initial folder structure (`cake/`) including subfolders for logic, assets, and docs
-  Implemented the homepage layout in `customer_app.py`, featuring a themed welcome screen and state management for tarot flow
-  Finalized lo-fi wireframes and documented visual direction (see `docs/lo-fi.pdf`)
-  Set up project documentation in README with structure, setup guide, and progress tracking

**Next Week Goals 04/25:**
- Implement interactive tarot drawing logic
- Build a basic tarot interpretation-to-cake matching function
- Design and implement the order interface with dynamic input options

## Weekly Progress – 05/02

This week, the following milestones were achieved:

1. **Home Page Update**
   - Added a top navigation bar to improve layout and make navigation easier.
2. **Card Drawing Feature**
   - Users can now draw three tarot cards, each with a flip animation. Once three cards are selected, the images are displayed.
3. **User Input & Recommendation Generation**
   - Users can enter allergy information in a text box. The system generates a personalized prompt based on the selected cards and input content.

**Next Week Goals 05/09:**
- Further refine the recommendation logic
- Polish UI/UX details based on user feedback

## Client Communication – 05/02

On 5/2/2025, we communicated with the client. All current features have been approved and merged into the main branch.

## Weekly Progress – 05/16

**Client Communication:**
- Held a meeting with the client to present the current version of the website and shared the source code.
- Received feedback from the client regarding several issues:
  - Allergen information was not correctly processed by the LLM model (now fixed).
  - The LLM model displayed the prompt text along with the result (currently being fixed).
  - Recommended products were not directly added to the cart upon confirmation (currently being fixed).
  - The UI for both the cart and the recommendation page is incomplete (currently being improved).

**Development Progress:**
- Fixed the issue where allergen information was not correctly processed by the LLM model.
- Started working on hiding the prompt text in the LLM model's output.
- Began implementing the feature to allow recommended products to be directly added to the cart upon confirmation.
- Continued improving the UI for the cart and recommendation pages based on client feedback.

## Client Communication – 05/30
On 5/30, I communicated with the client. All current features have been approved and merged into the main branch.

