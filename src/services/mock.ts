import type { StreamMessage, AgentFunction } from '@/types';
import { v4 as uuid } from 'uuid';

// Agent mapping keywords for routing
export const agentMappingKeywords = {
  // JIRA Agent - Issue tracking and project management
  jiraAgent: [
    "jira", "issue", "ticket", "bug", "task", "create", "report", "broken", "error", "problem"
  ],

  // Confluence Agent - Documentation and knowledge management  
  confluenceAgent: [
    "confluence", "page", "document", "wiki", "update", "edit", "notes", "guide", "write"
  ],

  // Salesforce Agent - CRM and sales operations
  salesforceAgent: [
    "salesforce", "crm", "opportunity", "lead", "account", "sales", "customer", "soql", "query"
  ],
};

// Default AllAi Agent response when no keywords match
const createDefaultAllAiResponse = (): StreamMessage[] => [
  // Text message - chunk 1
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "Hello! "
  },
  
  // Text message - chunk 2
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "I am "
  },
  
  // Text message - chunk 3
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "the **AllAi "
  },
  
  // Text message - chunk 4
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "Agent**. "
  },
  
  // Text message - chunk 5
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "How can "
  },
  
  // Text message - chunk 6
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "I help "
  },
  
  // Text message - chunk 7
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "you today? "
  },
  
  // Text message - chunk 8
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "Try mentioning "
  },
  
  // Text message - chunk 9
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "**JIRA**, "
  },
  
  // Text message - chunk 10
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "**Confluence**, "
  },
  
  // Text message - chunk 11 (final)
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "or **Salesforce** "
  },
  
  // Text message - chunk 12 (final)
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "to get started!"
  }
];

// AllAi Agent - Orchestrator handoff example
const createAllAiAgentResponse = (userMessage: string = "Create a bug report", targetAgent: string = "jiraAgent"): StreamMessage[] => {
  const targetAgentNames = {
    jiraAgent: "JIRA Agent",
    confluenceAgent: "Confluence Agent", 
    salesforceAgent: "Salesforce Agent"
  };
  
  const targetAgentName = targetAgentNames[targetAgent as keyof typeof targetAgentNames] || "specialized agent";
  
  return [
  {
    id: uuid(),
    type: "tool",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    toolName: "handoff_to_agent",
    toolCallId: "tool_handoff_001",
    status: "in_progress",
    authenticationType: null,
    data: {
      action: `**Agent Handoff Analysis**\n\nAnalyzing request: *${userMessage}*`,
      description: "Determining which specialized agent should handle this request",
      logs: [
        {
                type: "info",
          message: "Orchestrator analyzing user request"
        },
        {
                type: "info",
          message: "Determined agent to hand off. "
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    toolName: "handoff_to_agent",
    toolCallId: "tool_handoff_001", // Same toolCallId to update the same tile
    status: "completed",
    authenticationType: null,
    data: {
      action: `**Agent Handoff**\n\n**Handoff Decision:**\n- ✅ Target Agent: ${targetAgentName}\n- ✅ Ready to transfer control`,
      description: `Successfully analyzed request and prepared handoff to ${targetAgentName}`,
      logs: [
        {
          type: "info",
          message: "Orchestrator analyzing user request"
        },
        {
          type: "info",
          message: "Determined agent to hand off. "
        },
        {
          type: "info",
          message: `Preparing handoff to ${targetAgentName}`
        },
        {
          type: "info",
          message: `Ready to transfer control to ${targetAgentName}`
        }
      ]
    }
  },
  // Text confirmation message - chunk 1
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "I understand "
  },
  
  // Text confirmation message - chunk 2
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "you need "
  },
  
  // Text confirmation message - chunk 3
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "to "
  },
  
  // Text confirmation message - chunk 4
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: `${userMessage.toLowerCase()}. `
  },
  
  // Text confirmation message - chunk 5
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "Let me "
  },
  
  // Text confirmation message - chunk 6
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "hand this "
  },
  
  // Text confirmation message - chunk 7
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "over to "
  },
  
  // Text confirmation message - chunk 8
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: `our **${targetAgentName}** `
  },
  
  // Text confirmation message - chunk 9
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "who will "
  },
  
  // Text confirmation message - chunk 10 (final)
  {
    id: uuid(),
    type: "text",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "handle this request."
  }
  ];
};

// JIRA Agent - Create issue workflow
const createJiraAgentResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "tool",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolCallId: "tool_create_issue_001",
    status: "waiting_for_authentication",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\nIssue Type: *Bug*\nProject: *WEBAPP*",
      description: "Creating a new bug report in the WEBAPP project",
      logs: [
        {
                type: "info",
          message: "Issue creation tool call initiated"
        },
        {
                type: "warning",
          message: "JIRA authentication required to create issue"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolCallId: "tool_create_issue_001",
    status: "waiting_user_approval",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\n**Issue Details:**\n- Summary: Login page crashes on mobile devices\n- Priority: High\n- Components: Frontend, Mobile",
      description: "Ready to create JIRA issue - pending user approval",
      logs: [
        {
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          type: "warning",
          message: "JIRA authentication required to create issue"
        },
        {
          type: "info",
          message: "Successfully authenticated with JIRA"
        },
        {
          type: "info",
          message: "Waiting for user approval to create issue"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolCallId: "tool_create_issue_001",
    status: "in_progress",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\n**Progress:**\n- ✅ Validated issue fields\n- 🔄 Creating issue in JIRA\n- ⏳ Setting assignee and labels",
      description: "Actively creating the JIRA issue",
      logs: [
        {
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          type: "warning",
          message: "JIRA authentication required to create issue"
        },
        {
          type: "info",
          message: "Successfully authenticated with JIRA"
        },
        {
          type: "info",
          message: "Waiting for user approval to create issue"
        },
        {
          type: "info",
          message: "User approved - starting issue creation"
        },
        {
          type: "info",
          message: "Creating issue in WEBAPP project..."
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolCallId: "tool_create_issue_001",
    status: "completed",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\n**Issue Created Successfully:**\n- ✅ Issue Key: WEBAPP-1247\n- ✅ Priority: High\n- ✅ Assignee: Development Team",
      description: "Successfully created JIRA issue",
      logs: [
        {
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          type: "warning",
          message: "JIRA authentication required to create issue"
        },
        {
          type: "info",
          message: "Successfully authenticated with JIRA"
        },
        {
          type: "info",
          message: "Waiting for user approval to create issue"
        },
        {
          type: "info",
          message: "User approved - starting issue creation"
        },
        {
          type: "info",
          message: "Creating issue in WEBAPP project..."
        },
        {
          type: "info",
          message: "Issue created with key WEBAPP-1247"
        },
        {
          type: "info",
          message: "JIRA issue creation completed successfully"
        }
      ]
    }
  },
  // Text confirmation message - chunk 1
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "JIRA issue "
  },
  
  // Text confirmation message - chunk 2
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "created successfully! "
  },
  
  // Text confirmation message - chunk 3
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "Issue key: "
  },
  
  // Text confirmation message - chunk 4
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "**WEBAPP-1247** "
  },
  
  // Text confirmation message - chunk 5
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "View it "
  },
  
  // Text confirmation message - chunk 6
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "here: "
  },
  
  // Text confirmation message - chunk 7
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "[https://your-company.atlassian.net/browse/WEBAPP-1247](https://your-company.atlassian.net/browse/WEBAPP-1247)\n\n"
  },
  
  // Text confirmation message - chunk 8
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "The bug "
  },
  
  // Text confirmation message - chunk 9
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "report has "
  },
  
  // Text confirmation message - chunk 10
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "been assigned "
  },
  
  // Text confirmation message - chunk 11 (final)
  {
    id: uuid(),
    type: "text",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "to the development team."
  }
];

// Confluence Agent - Modify page workflow
const createConfluenceAgentResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "tool",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolCallId: "tool_modify_page_001",
    status: "waiting_for_authentication",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\nUpdating page: *Product Requirements Document*",
      description: "Modifying existing Confluence page with new requirements and specifications",
      logs: [
        {
                type: "info",
          message: "Tool call initiated for page modification"
        },
        {
                type: "warning",
          message: "Authentication required for Confluence workspace access"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolCallId: "tool_modify_page_001",
    status: "waiting_user_approval",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\n**Changes to be made:**\n- Add new feature requirements section\n- Update user acceptance criteria\n- Include technical specifications",
      description: "Ready to modify Confluence page - pending user approval for the proposed changes",
      logs: [
        {
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        },
        {
          type: "info",
          message: "Successfully authenticated with Confluence workspace"
        },
        {
          type: "info",
          message: "Waiting for user approval to proceed with page modifications"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolCallId: "tool_modify_page_001",
    status: "in_progress",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\n**Changes being applied:**\n- ✅ Add new feature requirements section\n- 🔄 Update user acceptance criteria\n- ⏳ Include technical specifications",
      description: "Actively modifying the Confluence page with approved changes",
      logs: [
        {
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        },
        {
          type: "info",
          message: "Successfully authenticated with Confluence workspace"
        },
        {
          type: "info",
          message: "Waiting for user approval to proceed with page modifications"
        },
        {
          type: "info",
          message: "User approved changes - starting page modification"
        },
        {
          type: "info",
          message: "Applying content modifications..."
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolCallId: "tool_modify_page_001",
    status: "completed",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\n**Changes successfully applied:**\n- ✅ Add new feature requirements section\n- ✅ Update user acceptance criteria\n- ✅ Include technical specifications",
      description: "Successfully modified the Confluence page with all requested changes",
      logs: [
        {
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        },
        {
          type: "info",
          message: "Successfully authenticated with Confluence workspace"
        },
        {
          type: "info",
          message: "Waiting for user approval to proceed with page modifications"
        },
        {
          type: "info",
          message: "User approved changes - starting page modification"
        },
        {
          type: "info",
          message: "Applying content modifications..."
        },
        {
          type: "info",
          message: "Saved page changes successfully"
        },
        {
          type: "info",
          message: "Page modification completed successfully"
        }
      ]
    }
  },
  // Text confirmation message - chunk 1
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "Confluence page "
  },
  
  // Text confirmation message - chunk 2
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "updated successfully! "
  },
  
  // Text confirmation message - chunk 3
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "Go to "
  },
  
  // Text confirmation message - chunk 4
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "this link "
  },
  
  // Text confirmation message - chunk 5
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "to check "
  },
  
  // Text confirmation message - chunk 6
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "the changes: "
  },
  
  // Text confirmation message - chunk 7
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "[https://your-company.atlassian.net/wiki/spaces/PROD/pages/123456789/Product+Requirements+Document](https://your-company.atlassian.net/wiki/spaces/PROD/pages/123456789/Product+Requirements+Document)\n\n"
  },
  
  // Text confirmation message - chunk 8
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "Perfect! I've "
  },
  
  // Text confirmation message - chunk 9
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "successfully updated "
  },
  
  // Text confirmation message - chunk 10 (final)
  {
    id: uuid(),
    type: "text",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "your **Product Requirements Document**."
  }
];

// Salesforce Agent - Execute SOQL query workflow
const createSalesforceAgentResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "tool",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolCallId: "tool_soql_001",
    status: "waiting_for_authentication",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\nQuery: *SELECT Id, Name, Amount FROM Opportunity LIMIT 5*",
      description: "Retrieving latest opportunity records from Salesforce",
      logs: [
        {
                type: "info",
          message: "SOQL query tool call initiated"
        },
        {
                type: "warning",
          message: "Salesforce authentication required to execute query"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolCallId: "tool_soql_001",
    status: "waiting_user_approval",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\n**Query will retrieve:**\n- Opportunity ID and Name\n- Deal Amount\n- Limited to 5 most recent records",
      description: "Ready to execute SOQL query - pending user approval to access Salesforce data",
      logs: [
        {
                type: "info",
          message: "Successfully authenticated with Salesforce org"
        },
        {
                type: "info",
          message: "Waiting for user approval to execute SOQL query"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolCallId: "tool_soql_001",
    status: "in_progress",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\n**Status:**\n- 🔄 Executing query against Salesforce database\n- ⏳ Retrieving opportunity records",
      description: "Actively executing SOQL query to retrieve latest opportunity records",
      logs: [
        {
                type: "info",
          message: "User approved query - starting execution"
        },
        {
                type: "info",
          message: "Executing SOQL query..."
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolCallId: "tool_soql_001",
    status: "completed",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\n**Results:**\n- ✅ Query executed successfully\n- ✅ Retrieved 5 opportunity records\n- ✅ Data processed and formatted",
      description: "Successfully executed SOQL query and retrieved the latest opportunity records",
      logs: [
        {
                type: "info",
          message: "Retrieved and formatted 5 opportunity records"
        }
      ]
    }
  },
  // Text confirmation message - chunk 1
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "Here are "
  },
  
  // Text confirmation message - chunk 2
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "your five "
  },
  
  // Text confirmation message - chunk 3
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "latest opportunity "
  },
  
  // Text confirmation message - chunk 4
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "records from "
  },
  
  // Text confirmation message - chunk 5
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "Salesforce:\n\n"
  },
  
  // Text confirmation message - chunk 6
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "**1. Enterprise "
  },
  
  // Text confirmation message - chunk 7
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "Software Deal**\n"
  },
  
  // Text confirmation message - chunk 8
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "Amount: $250,000 "
  },
  
  // Text confirmation message - chunk 9
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "| Stage: "
  },
  
  // Text confirmation message - chunk 10 (final)
  {
    id: uuid(),
    type: "text",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "Proposal/Price Quote\n\n"
  }
];

// Agent map for routing
export const mockAgents = {
  allAiAgent: (userMessage?: string, targetAgent?: string) => createAllAiAgentResponse(userMessage, targetAgent),
  jiraAgent: createJiraAgentResponse,
  confluenceAgent: createConfluenceAgentResponse,
  salesforceAgent: createSalesforceAgentResponse,
  defaultResponse: createDefaultAllAiResponse
};

// Agent router function - Always returns AllAi orchestrator agent
export const agentRouter = (userMessage: string): AgentFunction => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Check if any specialized agent keywords are present
  for (const [, keywords] of Object.entries(agentMappingKeywords)) {
    if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      // Return orchestrator agent that will handle handoff
      return mockAgents.allAiAgent;
    }
  }
  
  // No keywords found, return default response
  return mockAgents.defaultResponse;
};

// Helper function to determine target agent for handoff
export const getTargetAgentForHandoff = (userMessage: string): keyof typeof mockAgents | null => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  for (const [agentKey, keywords] of Object.entries(agentMappingKeywords)) {
    if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return agentKey as keyof typeof mockAgents;
    }
  }
  
  return null;
};