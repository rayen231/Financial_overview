from crewai import Agent, Task, Crew, Process
import os
import json

def controll(query):
    # Define the Financial Expert Agent
    financial_expert = Agent(
        role="Financial Query Observer",
    goal="Analyze the user query to identify stock symbols and detect if it is related to news.",
    backstory="An advanced AI specialized in understanding financial queries, extracting stock symbols, and identifying news-related requests.",
    verbose=True,
    allow_delegation=False
    )


    # Define the task for the agent
    financial_task = Task(
        description=(
            f"""Analyze the given financial query:{query} to:
                   1. Extract stock symbols enclosed in quotes.
                   2. Detect if the query is related to news based on keywords."""
        ),
        agent=financial_expert,
        expected_output=("""Return a JSON object containing stock symbols and news status like this example : 
                         {
            "stock_symbols": ["AAPL", "GOOGL"],
            "news": true
        }"""
        )
    )

    # Create a Crew with the Financial Expert agent and task
    crew = Crew(
        agents=[financial_expert],
        tasks=[financial_task],
        verbose=1,
        process=Process.sequential,
        Output_Log_File=True
    )

    # Execute the crew's task
    output = crew.kickoff()
    print("before parsing :",output)
    return json.loads(output)  # Convert the output to JSON format before returning

#controlled = print(controll("what you think about google stocks"))
