from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import status


class PagePagination(PageNumberPagination):
    max_page_size = 20
    page_size = 10
    page_size_query_param = "page_size"
    page_query_param = "page"

    def get_paginated_response(self, data):
        return Response(
            {
                "total_pages": self.page.paginator.num_pages,
                "next": True if self.get_next_link() else None,
                "prev": True if self.get_previous_link() else None,
                "results": data,
            },
            status.HTTP_200_OK,
        )
